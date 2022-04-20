import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {
    getCurrentLote,
    getLotes,
    getOperacoes,
    getOperacoesDesfazerLoteAtual,
    getOperacoesEmProcessamento,
    getOperacoesLoteAtual,
    getOperacoesRefazerLoteAtual,
    SetCurrentLote
} from 'app/store';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Lote} from '../../../store/reducers/operacoes.reducer';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit, OnDestroy {
    date: Date;
    resultados: any[] = [];
    settings: any;

    lockedOpen = false;

    operacoesProcessando = 0;
    operacoesPendentes = 0;
    operacoes = [];
    displayedOperacoes = [];
    lotes: any;
    loteAtual$: Observable<any>;
    operacoesLoteAtual$: Observable<any>;
    operacoesDesfazerLoteAtual$: Observable<any>;
    operacoesRefazerLoteAtual$: Observable<any>;
    operacoesLoteAtual = [];
    operacoesDesfazerLoteAtual = [];
    operacoesRefazerLoteAtual = [];
    loteAtual: Lote;

    selectedIds: string[] = [];
    isIndeterminate = false;

    filtros = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(private _store: Store<fromStore.State>,
                private _changeDetectorRef: ChangeDetectorRef,
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
        this.filtros.setValue('todas');
        this.filtros.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((value) => {
                if (value !== 'todas') {
                    if (this.loteAtual) {
                        this.displayedOperacoes = this.operacoesLoteAtual.filter((operacao: any) => operacao.status == value);
                    } else {
                        this.displayedOperacoes = this.operacoes.filter((operacao: any) => operacao.status == value);
                    }
                } else {
                    if (this.loteAtual) {
                        this.displayedOperacoes = this.operacoesLoteAtual;
                    } else {
                        this.displayedOperacoes = this.operacoes;
                    }
                }
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();

        this._store.pipe(
            select(getOperacoes)
        ).subscribe((operacoes) => {
            this.operacoes = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoes.push(operacoes[operacaoId]);
            });
            this.operacoes.reverse();
            if (!this.loteAtual) {
                if (this.filtros.value !== 'todas') {
                    this.displayedOperacoes = this.operacoes.filter((operacao: any) => operacao.status == this.filtros.value);
                } else {
                    this.displayedOperacoes = this.operacoes;
                }
            }
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getLotes)
        ).subscribe((lotes) => {
            this.lotes = lotes;
        });

        this.loteAtual$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(lote => this.loteAtual = !!lote ? this.lotes[lote] : null);

        this.operacoesLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((operacoes) => {
            this.operacoesLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesLoteAtual.push(operacoes[operacaoId]);
            });
            if (this.loteAtual) {
                if (this.filtros.value !== 'todas') {
                    this.displayedOperacoes = this.operacoesLoteAtual.filter((operacao: any) => operacao.status == this.filtros.value);
                } else {
                    this.displayedOperacoes = this.operacoesLoteAtual;
                }
            } else {
                if (this.filtros.value !== 'todas') {
                    this.displayedOperacoes = this.operacoes.filter((operacao: any) => operacao.status == this.filtros.value);
                } else {
                    this.displayedOperacoes = this.operacoes;
                }
            }
            this._changeDetectorRef.markForCheck();
        });

        this.operacoesDesfazerLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((operacoes) => {
            this.operacoesDesfazerLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesDesfazerLoteAtual.push(operacoes[operacaoId]);
            });
        });

        this.operacoesRefazerLoteAtual$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((operacoes) => {
            this.operacoesRefazerLoteAtual = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                this.operacoesRefazerLoteAtual.push(operacoes[operacaoId]);
            });
        });

        this._store
            .pipe(
                select(getOperacoesEmProcessamento),
            ).subscribe((value) => {
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    doRefazerBloco(): void {
        this.selectedIds.forEach((selectedId) => {
            const operacao = this.operacoes.find(operacao => operacao.id === selectedId);
            if (operacao.status >= 2 && operacao.redo) {
                this.refazer(operacao);
            }
        });
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

    doDesfazerBloco(): void {
        this.selectedIds.forEach((selectedId) => {
            const operacao = this.operacoes.find(operacao => operacao.id === selectedId);
            if (operacao.status === 1 && operacao.undo) {
                this.desfazer(operacao);
            }
        });
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
        this.deselectAll();
        this._store.dispatch(new SetCurrentLote(lote));
    }

    verOperacoes(): void {
        this.deselectAll();
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

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        let arr: any[];
        if (this.loteAtual) {
            arr = Object.keys(this.operacoesLoteAtual).map(k => this.operacoesLoteAtual[k]);
        } else {
            arr = Object.keys(this.operacoes).map(k => this.operacoes[k]);
        }
        this.selectedIds = arr.map(operacao => operacao.id);
        this.recompute();
    }

    toggleInSelected(operacaoId): void {
        const selectedOperacoesIds = [...this.selectedIds];

        if (selectedOperacoesIds.find(id => id === operacaoId) !== undefined) {
            this.selectedIds = selectedOperacoesIds.filter(id => id !== operacaoId);
        } else {
            this.selectedIds = [...selectedOperacoesIds, operacaoId];
        }
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    recompute(): void {
        if (this.loteAtual) {
            this.isIndeterminate = (this.selectedIds.length !== this.operacoesLoteAtual.length && this.selectedIds.length > 0);
        } else {
            this.isIndeterminate = (this.selectedIds.length !== this.operacoes.length && this.selectedIds.length > 0);
        }
    }

}
