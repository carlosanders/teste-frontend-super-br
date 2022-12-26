import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Colaborador, Pagination, Processo, Setor, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import * as fromStoreSidebar from 'app/main/apps/tarefas/store';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {CdkVisibilidadePluginComponent} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.component';
import {Router} from '@angular/router';
import {Back, getOperacoes, getRouterState} from '../../../../store';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'tarefa-create',
    templateUrl: './tarefa-create.component.html',
    styleUrls: ['./tarefa-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaCreateComponent implements OnInit, OnDestroy {

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;
    setorResponsavelPagination: Pagination;
    setorOrigemPaginationTree: Pagination;
    lotacaoPagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    visibilidades$: Observable<boolean>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NUP: any;

    routerState: any;
    isClearForm$: Observable<boolean>;
    isClearForm = false;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    operacaoId?: string;
    lote: string = '';
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _storeSideBar
     * @param _loginService
     * @param dialog
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefaCreateAppState>,
        private _storeSideBar: Store<fromStoreSidebar.TarefasAppState>,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this._profile = _loginService.getUserProfile().colaborador;
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeProcesso));
        this.isClearForm$ = this._storeSideBar.pipe(select(fromStoreSidebar.getIsClearForm));

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};
        this.lotacaoPagination = new Pagination();
        this.lotacaoPagination.populate = ['colaborador', 'colaborador.usuario', 'colaborador.usuario.colaborador', 'setor', 'setor.unidade'];
        this.lotacaoPagination.context = {
            'semAfastamento': true
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.operacaoId = null;
        this.operacoes = [];

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((p) => {
            this.processo = p;
        });

        this.tarefa = new Tarefa();
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
        let lotacaoPrincipal: Setor = null;
        this._profile.lotacoes.filter(lotacao => lotacao.principal ? lotacaoPrincipal = lotacao.setor : null);
        this.tarefa.setorOrigem = lotacaoPrincipal ? lotacaoPrincipal : this._profile.lotacoes[0].setor;
        this.tarefa.unidadeResponsavel = lotacaoPrincipal?.unidade ? lotacaoPrincipal?.unidade : this._profile.lotacoes[0].setor.unidade;

        if (this.processo) {
            this.tarefa.processo = this.processo;
        }

        this.visibilidades$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(restricao => !!restricao)
        ).subscribe(() => {
            const dialogRef = this.dialog.open(CdkVisibilidadePluginComponent, {
                data: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    NUP: this.NUP
                },
                hasBackdrop: false,
                closeOnNavigation: true
            });

            dialogRef.afterClosed().pipe(
                tap(
                    (value) => {
                        const processoId = this.routerState.params.processoHandle ?
                            this.routerState.params.processoHandle : this.processo.id;
                        if (value === 1 && processoId) {
                            this._router.navigate(['apps/tarefas/' +
                            this.routerState.params.generoHandle + '/' +
                            this.routerState.params.typeHandle + '/' +
                            this.routerState.params.targetHandle + '/visibilidade/' + processoId]).then();
                        }
                    }
                ),
                tap(() => dialogRef.close()),
                take(1)
            ).subscribe();

            this._store.dispatch(new fromStore.GetVisibilidadesSuccess({
                restricaoProcesso: false
            }));
        });

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.detectChanges();
        });

        this.isClearForm$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(limpaForm => !!limpaForm)
        ).subscribe(() => {
            this.isClearForm = true;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();

        this._store.dispatch(new fromStore.UnloadProcesso());

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    verificaVisibilidadeProcesso(value): void {
        this.NUP = value.NUP;
        this.processo = value;
        this._store.dispatch(new fromStore.GetVisibilidades(value.id));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const tarefa = new Tarefa();
        this.lote = '';

        this.operacaoId = CdkUtils.makeId();

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        this._store.dispatch(new fromStore.SaveTarefa({tarefa: tarefa, operacaoId: this.operacaoId, loteId: this.lote}));
    }

    submitLote(event: any): void {
        this.lote = event.loteId;
        const tarefa = new Tarefa();

        this.operacaoId = CdkUtils.makeId();

        Object.entries(event.tarefa).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        this._store.dispatch(new fromStore.SaveTarefa({tarefa: tarefa, operacaoId: this.operacaoId, loteId: this.lote}));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }
}
