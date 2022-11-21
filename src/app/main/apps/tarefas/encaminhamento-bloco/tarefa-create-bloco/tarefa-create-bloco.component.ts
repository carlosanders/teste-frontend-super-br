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
import {getOperacoes, getRouterState} from '../../../../../store';
import {getProcessosEncaminhamento} from '../store';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'encaminhar-tarefa-create-bloco',
    templateUrl: './tarefa-create-bloco.component.html',
    styleUrls: ['./tarefa-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EncaminharTarefaCreateBlocoComponent implements OnInit, OnDestroy {

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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    NUP: any;
    processo: Processo;

    routerState: any;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    operacaoId?: string;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();


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

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};
        this.lote = CdkUtils.makeId();
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
        this.lote = CdkUtils.makeId();
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.detectChanges();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
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
        this.lote = CdkUtils.makeId();
        this.processos.forEach((processoBloco) => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.processo = processoBloco;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveTarefa({
                tarefa: tarefa,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

    cancel(): void {
        this._router.navigate([this.routerState.url.split('/criar-tarefas-bloco')[0]]).then();
    }
}
