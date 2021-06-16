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

import {Colaborador, Pagination, Processo, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getOperacoesState, getRouterState} from '../../../../../store';
import {getProcessosEncaminhamento, UnloadEncaminhamentoBloco} from "../store";
import {CdkUtils} from "../../../../../../@cdk/utils";

@Component({
    selector: 'encaminhar-tarefa-create-bloco',
    templateUrl: './tarefa-create-bloco.component.html',
    styleUrls: ['./tarefa-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EncaminharTarefaCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;
    setorResponsavelPagination: Pagination;
    setorOrigemPaginationTree: Pagination;

    processos$: Observable<Processo[]>;
    processos: Processo[];

    // visibilidades$: Observable<boolean>;
    NUP: any;
    processo: Processo;

    routerState: any;

    operacoes: any[] = [];
    operacaoId?: string;


    /**
     * @param _store
     * @param _loginService
     * @param _dialog
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefaCreateBlocoAppState>,
        public _loginService: LoginService,
        private _dialog: MatDialog,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getProcessosEncaminhamento));
        this._profile = _loginService.getUserProfile().colaborador;
        // this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeProcesso));

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
        this.operacaoId = null;
        this.operacoes = [];

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe((p) => {
            this.processos = p;
        });

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
        this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;

        // this.visibilidades$.pipe(
        //     takeUntil(this._unsubscribeAll),
        // ).subscribe(
        //     (restricao) => {
        //         if (restricao) {
        //             const dialogRef = this._dialog.open(CdkVisibilidadePluginComponent, {
        //                 data: {
        //                     NUP: this.NUP
        //                 },
        //                 hasBackdrop: false,
        //                 closeOnNavigation: true
        //             });
        //
        //             dialogRef.afterClosed()
        //                 .pipe(
        //                     tap(
        //                         (value) => {
        //                             const processoId = this.routerState.params.processoHandle ?
        //                                 this.routerState.params.processoHandle : this.processo.id;
        //                             if (value === 1 && processoId) {
        //                                 this._router.navigate(['apps/tarefas/' +
        //                                 this.routerState.params.generoHandle + '/' +
        //                                 this.routerState.params.typeHandle + '/' +
        //                                 this.routerState.params.targetHandle + '/visibilidade/' + processoId]);
        //                             }
        //                         }
        //                     ),
        //                     tap(() => dialogRef.close()),
        //                     take(1)
        //                 ).subscribe();
        //
        //             this._store.dispatch(new fromStore.GetVisibilidadesSuccess({
        //                 restricaoProcesso: false
        //             }));
        //         }
        //     }
        // );

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => this.operacaoId && !!op && !!op.content && op.type === 'tarefa')
            )
            .subscribe(
                (operacao) => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.detectChanges();
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this._dialog) {
            this._dialog.closeAll();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        this.operacaoId = CdkUtils.makeId();

        this.processos.forEach((processoBloco) => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.processo = processoBloco;

            if (processoBloco.especieProcesso?.workflow) {
                tarefa.workflow = processoBloco.especieProcesso.workflow;
            }

            this._store.dispatch(new fromStore.SaveTarefa(tarefa));
        });
    }

    cancel(): void {
        this._router.navigate([this.routerState.url.split('/criar-tarefas-bloco')[0]]).then();
    }
}