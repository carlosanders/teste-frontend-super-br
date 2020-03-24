import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Lembrete, Processo} from '../../../../../@cdk/models';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../arquivista-classificacao-bloco/store';
import {getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {getSelectedProcessos} from '../arquivista-list/store/selectors';

@Component({
    selector: 'app-arquivista-classificacao-bloco',
    templateUrl: './arquivista-classificacao-bloco.component.html',
    styleUrls: ['./arquivista-classificacao-bloco.component.scss']
})
export class ArquivistaClassificacaoBlocoComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processos$: Observable<Processo[]>;
    processos: Processo[];
    operacoes: any[] = [];

    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.ArquivistaClassificacaoBlocoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.initObservales();

    }

    initObservales(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getSelectedProcessos));
    }

    ngOnInit(): void {

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processos => this.processos = processos);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'classificacao')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });
    }

    submit(values): void {
        this.operacoes = [];
        this.processos.forEach(processo => {
            processo.classificacao = values.processo.classificacao;
            this._store.dispatch(new fromStore.SaveArquivistaClassificacaoBloco(processo));
        });
    }
}
