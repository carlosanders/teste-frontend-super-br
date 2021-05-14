import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ModalidadeTransicao, Pagination, Processo, Transicao} from '../../../../../@cdk/models';
import * as fromStore from './store';
import {RouterStateUrl, getRouterState, getOperacoes} from '../../../../store';
import {takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../@cdk/animations';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CdkConfirmDialogComponent} from "@cdk/components/confirm-dialog/confirm-dialog.component";
import {getModalidadeTransicao, getSelectedProcessos} from "../arquivista-list/store";
import {Router} from "@angular/router";
import {CdkUtils} from "../../../../../@cdk/utils";
import {SnackBarDesfazerComponent} from "../../../../../@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
    selector: 'transicao-arquivista-bloco',
    templateUrl: './transicao-arquivista-bloco.component.html',
    styleUrls: ['./transicao-arquivista-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoArquivistaBlocoComponent implements OnInit, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();
    loading: boolean;
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;
    modalidadeTransicao$: Observable<ModalidadeTransicao>;
    modalidadeTransicao: ModalidadeTransicao;
    modalidadeTransicaoExtravioDesarquivamento$: Observable<ModalidadeTransicao>;

    total = 0;

    private routerState: RouterStateUrl;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    operacoes: any[] = [];

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;

    constructor(
        private _store: Store<fromStore.TransicaoArquivistaBlocoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getSelectedProcessos));
        this.modalidadeTransicao$ = this._store.pipe(select(getModalidadeTransicao));
        this.modalidadeTransicaoExtravioDesarquivamento$ = this._store.pipe(select(fromStore.getModalidadeTransicao));
    }

    ngOnInit(): void {
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processos => this.processos = processos);

        this.modalidadeTransicao$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(modalidade => this.modalidadeTransicao = modalidade);

        this.modalidadeTransicaoExtravioDesarquivamento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(modalidadeTransicaoExtravioDesarquivamento => {
            if (modalidadeTransicaoExtravioDesarquivamento) {
                this.modalidadeTransicao = modalidadeTransicaoExtravioDesarquivamento;
            }
        });

        this._store
            .pipe(
                select(getOperacoes),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(
                operacoes => {
                    this.operacoes = Object.values(operacoes).filter(operacao => operacao.type === 'temporalidade e destinação');
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

    ngAfterViewInit(): void {
        if (this.operacoes.length === 0 && (!this.processos || this.processos.length < 2)) {
            this._router.navigate([
                'apps',
                'arquivista',
                this.routerState.params.unidadeHandle,
                this.routerState.params.typeHandle
            ]).then();
        }

        if (!this.modalidadeTransicao) {
            this._router.navigate([
                'apps',
                'arquivista',
                this.routerState.params.unidadeHandle,
                this.routerState.params.typeHandle
            ]).then();
        }
    }

    submit(values): void {
        const loteId = CdkUtils.makeId();

        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
            },
            disableClose: false
        });

        const tituloModalidadeTransicao = this.modalidadeTransicao.valor.toLowerCase();

        this.confirmDialogRef
            .componentInstance
            .confirmMessage = 'Deseja realmente realizar a ' + tituloModalidadeTransicao +
            ' em bloco? NUPs apensos ou anexos sofrerão a mesma temporalidade e destinação.';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.operacoes = [];
                this.processos.forEach(processo => {
                    const operacaoId = CdkUtils.makeId();
                    const transicao = new Transicao();
                    Object.entries(values).forEach(
                        ([key, value]) => {
                            transicao[key] = value;
                        }
                    );
                    transicao.processo = processo;
                    this._store.dispatch(new fromStore.SaveTransicaoArquivista({
                        transicao: transicao,
                        operacaoId: operacaoId,
                        loteId: loteId,
                        redo: [
                            new fromStore.SaveTransicaoArquivista({
                                transicao: transicao,
                                operacaoId: operacaoId,
                                loteId: loteId,
                                redo: 'inherent'
                                // redo e undo são herdados da ação original
                            }),
                            new fromStore.SaveTransicaoArquivistaFlush()
                        ],
                        undo: null
                    }));

                    if (this.snackSubscription) {
                        // temos um snack aberto, temos que ignorar
                        this.snackSubscription.unsubscribe();
                        this.sheetRef.dismiss();
                        this.snackSubscription = null;
                    }

                    this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
                        duration: 3000,
                        panelClass: ['cdk-white-bg'],
                        data: {
                            icon: 'check',
                            text: 'Realizando transição'
                        }
                    });

                    this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
                        if (data.dismissedByAction === true) {
                            this._store.dispatch(new fromStore.SaveTransicaoArquivistaCancel());
                        } else {
                            this._store.dispatch(new fromStore.SaveTransicaoArquivistaFlush());
                        }
                    });

                });
            }
            this.confirmDialogRef = null;
        });
    }

    cancel(): void {
        this._router.navigate([
            'apps',
            'arquivista',
            this.routerState.params.unidadeHandle,
            this.routerState.params.typeHandle,
            'operacoes-bloco'
        ]).then();
    }
}
