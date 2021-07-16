import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ModalidadeTransicao, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back, getRouterState, RouterStateUrl} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {getProcesso} from '../../processo/store';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'realizar-desarquivamento',
    templateUrl: './realizar-desarquivamento.component.html',
    styleUrls: ['./realizar-desarquivamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RealizarDesarquivamentoComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject();
    private routerState: RouterStateUrl;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    processo$: Observable<Processo>;
    processo: Processo;

    transicao: Transicao;

    modalidadeTransicao$: Observable<ModalidadeTransicao>;

    constructor(
        private _store: Store<fromStore.RealizarDesarquivamentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.modalidadeTransicao$ = this._store.pipe(select(fromStore.getModalidadeTransicao));
    }

    ngOnInit(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.processo$.pipe(
            filter(processo => !!processo && (!this.processo || processo.id !== this.processo.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });
    }

    submit(values): void {
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
            },
            disableClose: false
        });

        this.confirmDialogRef
            .componentInstance
            .confirmMessage = 'Deseja realmente desarquivar o processo? NUPs apensos ou anexos também serão desarquivados.';
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const transicao = new Transicao();

                Object.entries(values).forEach(
                    ([key, value]) => {
                        transicao[key] = value;
                    }
                );

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveRealizarDesarquivamento({
                    transicao: transicao,
                    operacaoId: operacaoId
                }));
            }
            this.confirmDialogRef = null;
        });
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }
}
