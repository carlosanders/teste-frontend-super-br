import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {takeUntil} from 'rxjs/operators';
import {
    getCurrentLote, getLotes,
    getOperacoes, getOperacoesDesfazerLoteAtual,
    getOperacoesEmProcessamento,
    getOperacoesLoteAtual, getOperacoesRefazerLoteAtual,
    SetCurrentLote
} from 'app/store';
import {Observable, Subject} from 'rxjs';
import {CdkSidebarService} from '../../../../@cdk/components/sidebar/sidebar.service';
import {Lote} from '../../../store/reducers/operacoes.reducer';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject();

    date: Date;
    resultados: any[] = [];
    settings: any;

    lockedOpen = false;

    operacoesProcessando = 0;
    operacoesPendentes = 0;
    operacoes$: Observable<any>;
    operacoes = [];
    lotes: any;
    loteAtual$: Observable<any>;
    operacoesLoteAtual$: Observable<any>;
    operacoesDesfazerLoteAtual$: Observable<any>;
    operacoesRefazerLoteAtual$: Observable<any>;
    operacoesLoteAtual = [];
    operacoesDesfazerLoteAtual = [];
    operacoesRefazerLoteAtual = [];
    loteAtual: Lote;

    /**
     *
     * @param _store
     * @param _cdkSidebarService
     */
    constructor(private _store: Store<fromStore.State>,
                private _cdkSidebarService: CdkSidebarService) {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true
        };
        this.loteAtual$ = this._store.pipe(select(getCurrentLote));
        this.operacoesLoteAtual$ = this._store.pipe(select(getOperacoesLoteAtual));
        this.operacoesDesfazerLoteAtual$ = this._store.pipe(select(getOperacoesDesfazerLoteAtual));
        this.operacoesRefazerLoteAtual$ = this._store.pipe(select(getOperacoesRefazerLoteAtual));
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getOperacoes)
        ).subscribe((operacoes) => {
            this.operacoes = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoes.push(operacoes[operacaoId]);
            });
        });

        this._store.pipe(
            select(getLotes)
        ).subscribe((lotes) => {
            this.lotes = lotes;
        });

        this.loteAtual$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(lote => {
            if (lote) {
                this.loteAtual = this.lotes[lote];
            }
        });

        this.operacoesLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(operacoes => {
            this.operacoesLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesLoteAtual.push(operacoes[operacaoId]);
            });
        });

        this.operacoesDesfazerLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(operacoes => {
            this.operacoesDesfazerLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesDesfazerLoteAtual.push(operacoes[operacaoId]);
            });
        });

        this.operacoesRefazerLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(operacoes => {
            this.operacoesRefazerLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesRefazerLoteAtual.push(operacoes[operacaoId]);
            });
        });

        this._store
            .pipe(
                select(getOperacoesEmProcessamento),
            ).subscribe(value => {
            this.operacoesProcessando = Object.keys(value).length;
            if (this.operacoesProcessando === 0) {
                this.operacoesPendentes = 0;
            } else {
                if (this.operacoesProcessando > this.operacoesPendentes) {
                    this.operacoesPendentes = this.operacoesProcessando;
                }
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    refazer(operacao): void {
        if (Array.isArray(operacao.redo)) {
            operacao.redo.forEach((action) => {
                this._store.dispatch(action);
            });
        } else {
            this._store.dispatch(operacao.redo);
        }
    }

    desfazer(operacao): void {
        if (Array.isArray(operacao.undo)) {
            operacao.undo.forEach((action) => {
                this._store.dispatch(action);
            });
        } else {
            this._store.dispatch(operacao.undo);
        }
    }

    refazerLoteAtual(): void {
        this.operacoesRefazerLoteAtual.forEach((operacao) => {
            if (Array.isArray(operacao.redo)) {
                operacao.redo.forEach((action) => {
                    this._store.dispatch(action);
                });
            } else {
                this._store.dispatch(operacao.redo);
            }
        });
    }

    desfazerLoteAtual(): void {
        this.operacoesDesfazerLoteAtual.forEach((operacao) => {
            if (Array.isArray(operacao.undo)) {
                operacao.undo.forEach((action) => {
                    this._store.dispatch(action);
                });
            } else {
                this._store.dispatch(operacao.undo);
            }
        });
    }

    verLote(lote): void {
        this._store.dispatch(new SetCurrentLote(lote));
    }

    verOperacoes(): void {
        this._store.dispatch(new SetCurrentLote(null));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpen(): void {
        this._cdkSidebarService.getSidebar('quickPanel').toggleOpen();
    }

    toggleSidebarUnfold(): void {
        this._cdkSidebarService.getSidebar('quickPanel').unfold();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarLock(): void {
        this._cdkSidebarService.getSidebar('quickPanel').toggleFold();
    }
}
