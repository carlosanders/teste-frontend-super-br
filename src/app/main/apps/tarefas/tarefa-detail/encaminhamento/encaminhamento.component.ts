import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState} from 'app/store/reducers';
import * as fromTarefaDetailStore from '../store';
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {Tarefa} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkUtils} from '@cdk/utils';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
    selector: 'encaminhamento',
    templateUrl: './encaminhamento.component.html',
    styleUrls: ['./encaminhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EncaminhamentoComponent implements OnInit, OnDestroy {

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _snackBar
     * @param _router
     * @param _matDialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.EncaminhamentoAppState>,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _matDialog: MatDialog,
    ) {
        this.tarefa$ = this._store.pipe(select(fromTarefaDetailStore.getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
        });
        this.errors$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.Unload());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        if (values.options === 'criar_tarefa') {
            this._router.navigate([
                'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/criar/' + this.tarefa.processo.id
            ]).then();
        }
        if (values.options === 'arquivar') {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                    message: 'Deseja realmente arquivar o processo ' + this.tarefa.processo.NUPFormatado + '?'
                },
                disableClose: false
            });

            this.confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new fromStore.SaveProcesso({
                        processo: this.tarefa.processo,
                        operacaoId: operacaoId
                    }));
                }
                this.confirmDialogRef = null;
            });
        }
        if (values.options === 'remeter') {
            this._router.navigate([
                'apps/processo/' + this.tarefa.processo.id + '/editar/remessas/editar/criar'
            ]).then();
        }
    }

    cancel(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params['generoHandle'] + '/' + this.routerState.params['typeHandle'] + '/' + this.routerState.params['targetHandle']]).then();
    }
}
