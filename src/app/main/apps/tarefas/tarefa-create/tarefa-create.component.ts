import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import * as moment from 'moment';
import {Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Processo} from '@cdk/models';
import {take, takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {CdkVisibilidadePluginComponent} from '../../../../../@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.component';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {Back} from "../../../../store/actions";

@Component({
    selector: 'tarefa-create',
    templateUrl: './tarefa-create.component.html',
    styleUrls: ['./tarefa-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;
    setorResponsavelPagination: Pagination;
    setorOrigemPaginationTree: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    visibilidades$: Observable<boolean>;
    NUP: any;

    routerState: any;

    /**
     * @param _store
     * @param _loginService
     * @param dialog
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.TarefaCreateAppState>,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this._profile = _loginService.getUserProfile().colaborador;
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeProcesso));

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(p => {
            this.processo = p;
        });

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
        this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;

        if (this.processo) {
            this.tarefa.processo = this.processo;
        }

        this.visibilidades$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(
            (restricao) => {
                if (restricao) {
                    const dialogRef = this.dialog.open(CdkVisibilidadePluginComponent, {
                        data: {
                            NUP: this.NUP
                        },
                        hasBackdrop: false,
                        closeOnNavigation: true
                    });

                    dialogRef.afterClosed()
                        .pipe(
                            tap(
                                (value) => {
                                    const processoId = this.routerState.params.processoHandle ?
                                        this.routerState.params.processoHandle : this.processo.id;
                                    if (value === 1 && processoId) {
                                        this._router.navigate(['apps/tarefas/' +
                                        this.routerState.params.generoHandle + '/' +
                                        this.routerState.params.typeHandle + '/' +
                                        this.routerState.params.targetHandle + '/visibilidade/' + processoId]);
                                    }
                                }
                            ),
                            tap(() => dialogRef.close()),
                            take(1)
                        ).subscribe();

                    this._store.dispatch(new fromStore.GetVisibilidadesSuccess({
                        restricaoProcesso: false
                    }));
                }
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

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

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        this._store.dispatch(new fromStore.SaveTarefa(tarefa));

    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
