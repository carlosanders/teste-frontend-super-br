import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {Etiqueta, Pagination, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {
    DeleteVinculacaoEtiqueta,
    expandirTela,
    getEtiqueta,
    SaveConteudoVinculacaoEtiqueta,
    SaveEtiqueta
} from './store';
import {getMaximizado, ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {CdkUtils} from '@cdk/utils';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {
    CdkTarefaListService,
} from '../../../../../@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';

@Component({
    selector: 'tarefa-detail',
    templateUrl: './tarefa-detail.component.html',
    styleUrls: ['./tarefa-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaDetailComponent implements OnInit, OnDestroy {

    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;
    errorsAddEtiqueta$: Observable<any>;
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];
    vinculacaoEtiquetaPagination: Pagination;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    showEtiqueta: boolean = false;
    habilitarOpcaoBtnAddEtiqueta: boolean = true;
    placeholderEtiq = 'Adicionar etiquetas na tarefa';
    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    expandir$: Observable<boolean>;
    screen$: Observable<any>;
    routerState: any;
    maximizado$: Observable<boolean>;
    maximizado: boolean = false;
    mobileMode: boolean = false;
    routeAtividade: string = 'atividades/criar';
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    novaAba = false;
    expandState: 'minimum' | 'maximized' | 'collapsed' = 'minimum';
    isGridMode: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TarefaDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _snackBar: MatSnackBar,
        private _cdkTarefaListService: CdkTarefaListService
    ) {
        this._profile = _loginService.getUserProfile();
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.expandir$ = this._store.pipe(select(expandirTela));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                }
            ]
        };

        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.errorsAddEtiqueta$ = this._store.pipe(select(fromStore.getEtiquetaError));
        this._cdkTarefaListService
            .viewModeObservable()
            .pipe(
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((viewMode) => this.isGridMode = viewMode === 'grid');
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            if (routerState.state.queryParams['novaAba']) {
                this.novaAba = true;
                this.doToggleMaximizado(this.novaAba);
            }
            this.routerState = routerState.state;
        });

        this.tarefa$.pipe(
            filter(tarefa => !!tarefa),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
            this.vinculacoesEtiquetas = tarefa.vinculacoesEtiquetas?.filter((vinculacaoEtiqueta: VinculacaoEtiqueta) => !vinculacaoEtiqueta.etiqueta.sistema);
        });
        this.expandir$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (expandir) => {
                if (expandir || !this.novaAba) {
                    this.doToggleMaximizado(expandir);
                }
            }
        );

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            maximizado => this.maximizado = maximizado
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    submit(): void {
    }


    onVinculacaoEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            tarefa: this.tarefa,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onVinculacaoEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onVinculacaoEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            tarefaId: this.tarefa.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new SaveEtiqueta({
            etiqueta: etiqueta,
            tarefa: this.tarefa,
            operacaoId: operacaoId
        }));
        this.etiqueta = null;
        this.showEtiqueta = false;
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }
}
