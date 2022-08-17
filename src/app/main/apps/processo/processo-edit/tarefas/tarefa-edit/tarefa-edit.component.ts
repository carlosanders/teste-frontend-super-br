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

import {Colaborador, Pagination, Processo, Setor, Tarefa, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getOperacoes} from 'app/store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'tarefa-edit',
    templateUrl: './tarefa-edit.component.html',
    styleUrls: ['./tarefa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaEditComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    logEntryPagination: Pagination;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    operacaoId?: string;
    lote: string = '';
    isClearForm$: Observable<boolean>;
    isClearForm = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * @param _store
     * @param _loginService
     * @param _changeDetectorRef
     *
     */
    constructor(
        private _store: Store<fromStore.TarefaEditAppState>,
        public _loginService: LoginService,
        private _changeDetectorRef: ChangeDetectorRef,
) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = _loginService.getUserProfile().colaborador;

        this.logEntryPagination = new Pagination();
        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa', 'especieProcesso'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
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


        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => this.processo = processo);

        this.tarefa$.pipe(
            filter(tarefa => !!tarefa),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
            this.tarefa.unidadeResponsavel = tarefa.setorResponsavel?.unidade;
            this.logEntryPagination.filter = {
                entity: 'SuppCore\\AdministrativoBackend\\Entity\\Tarefa',
                id: +this.tarefa.id
            };
        });

        if (!this.tarefa) {
            this.tarefa = new Tarefa();
            this.tarefa.processo = this.processo;
            this.tarefa.dataHoraInicioPrazo = moment();
            this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});

            let lotacaoPrincipal: Setor = null;
            this._profile.lotacoes.filter(lotacao => lotacao.principal ? lotacaoPrincipal = lotacao.setor : null);
            this.tarefa.setorOrigem = lotacaoPrincipal ? lotacaoPrincipal : this._profile.lotacoes[0].setor;
            this.tarefa.unidadeResponsavel = lotacaoPrincipal?.unidade;
        }

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
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const tarefa = new Tarefa();
        this.lote = '';

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
