import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
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
import {getModalidadeTransicao} from '../arquivista-list/store';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'realizar-transicao',
    templateUrl: './realizar-transicao.component.html',
    styleUrls: ['./realizar-transicao.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RealizarTransicaoComponent implements OnInit, OnDestroy {
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;
    processo$: Observable<Processo>;
    processo: Processo;
    transicao: Transicao;
    modalidadeTransicao$: Observable<ModalidadeTransicao>;
    modalidadeTransicao: ModalidadeTransicao;
    private _unsubscribeAll: Subject<any> = new Subject();
    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RealizarTransicaoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.modalidadeTransicao$ = this._store.pipe(select(getModalidadeTransicao));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.processo$.pipe(
            filter(processo => !!processo && (!this.processo || processo.id !== this.processo.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this.modalidadeTransicao$.pipe(
            filter(modalidadeTransicao => !!modalidadeTransicao && (!this.modalidadeTransicao || modalidadeTransicao.id !== this.modalidadeTransicao.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((modalidadeTransicao) => {
            this.modalidadeTransicao = modalidadeTransicao;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const tituloModalidadeTransicao = this.modalidadeTransicao.valor.toLowerCase();
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Deseja realmente realizar a ' + tituloModalidadeTransicao +
                    '? NUPs apensos ou anexos sofrerão a mesma temporalidade e destinação.'
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const transicao = new Transicao();

                Object.entries(values).forEach(
                    ([key, value]) => {
                        transicao[key] = value;
                    }
                );

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveRealizarTransicao({
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
