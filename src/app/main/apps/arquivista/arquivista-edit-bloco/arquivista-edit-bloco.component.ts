import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Processo} from '@cdk/models';
import {getOperacoes, getRouterState, RouterStateUrl} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {getSelectedProcessos} from '../arquivista-list/store';
import {Router} from '@angular/router';
import * as fromStore from './store';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'arquivista-edit-bloco',
    templateUrl: './arquivista-edit-bloco.component.html',
    styleUrls: ['./arquivista-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaEditBlocoComponent implements OnInit, OnDestroy, AfterViewInit {

    loading: boolean;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;
    total = 0;
    routerState: RouterStateUrl;
    savingId$: Observable<number[]>;
    errors$: Observable<any>;
    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    blocoEditClassificacao = false;
    blocoEditDataHoraProximaTransicao = false;
    blocoEditLembrete = true;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.ArquivistaEditBlocoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.loading = false;
        this.savingId$ = this._store.pipe(select(fromStore.getSavingId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getSelectedProcessos));
    }

    ngOnInit(): void {
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processos) => {
            this.processos = processos;
        });

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'arquivista' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'arquivista' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
        });
    }

    ngAfterViewInit(): void {
        if (this.operacoes.length === 0 && (!this.processos || this.processos.length < 2)) {
            this._router.navigate([
                'apps',
                'arquivista',
                this.routerState.params.unidadeHandle,
                this.routerState.params.typeHandle
            ]).then();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    doAbort(): void {
        this._router.navigate([
            'apps',
            'arquivista',
            this.routerState.params.unidadeHandle,
            this.routerState.params.typeHandle,
            'operacoes-bloco'
        ]).then();
    }

    submit(values): void {
        this.operacoes = [];
        this.lote = CdkUtils.makeId();
        this.processos.forEach((processoBloco) => {
            const processo = new Processo();
            processo.id = processoBloco.id;
            const operacaoId = CdkUtils.makeId();

            const changes = {};
            if (values['classificacao']) {
                changes['classificacao'] = values['classificacao'].id;
            }
            changes['dataHoraProximaTransicao'] = values['dataHoraProximaTransicao'];
            changes['lembreteArquivista'] = values['lembreteArquivista'];

            const payload: any = {
                operacaoId: operacaoId,
                loteId: this.lote,
                processo: processo,
                changes: changes,
                redo: [
                    new fromStore.SaveProcesso({
                        operacaoId: operacaoId,
                        loteId: this.lote,
                        processo: processo,
                        changes: changes,
                        redo: 'inherent',
                        undo: null
                    })
                ],
                undo: null
            };

            this._store.dispatch(new fromStore.SaveProcesso(payload));
        });
    }
}
