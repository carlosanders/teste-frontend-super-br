import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Back, getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../@cdk/animations';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CdkConfirmDialogComponent} from "@cdk/components/confirm-dialog/confirm-dialog.component";
import {getProcesso} from "../../processo/store";

@Component({
    selector: 'realizar-transicao',
    templateUrl: './realizar-transicao.component.html',
    styleUrls: ['./realizar-transicao.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RealizarTransicaoComponent implements OnInit {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    processo$: Observable<Processo>;
    processo: Processo;

    processoId: number;
    operacoes: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();
    modalidadeTransicaoPagination: Pagination;
    transicao: Transicao;
    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.RealizarTransicaoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.modalidadeTransicaoPagination = new Pagination();
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'realizar-transicao')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.processoId = this.routerState.params.processoHandle;

        this.processo$.pipe(
            filter(processo => !!processo && (!this.processo || processo.id !== this.processo.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
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

        this.confirmDialogRef.componentInstance.confirmMessage = 'Deseja realmente realizar a transição arquivística?  NUPs apensos ou anexação sofrerão a mesma transição.';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const transicao = new Transicao();

                Object.entries(values).forEach(
                    ([key, value]) => {
                        transicao[key] = value;
                    }
                );
                this._store.dispatch(new fromStore.SaveRealizarTransicao(transicao));
            }
            this.confirmDialogRef = null;
        });
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }
}
