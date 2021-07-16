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
import {takeUntil} from 'rxjs/operators';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'encaminhamento',
    templateUrl: './encaminhamento.component.html',
    styleUrls: ['./encaminhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EncaminhamentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _router
     * @param _matDialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.EncaminhamentoAppState>,
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
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
        });

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        if (values.options === 'criar_tarefa') {
            this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/' + this.tarefa.processo.id]).then();
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
                    this._store.dispatch(new fromStore.SaveProcesso(this.tarefa.processo));
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
        this._router.navigate(['apps/tarefas/' + this.routerState.url.split('/')[3] + '/' + this.routerState.url.split('/')[4] + '/entrada']).then();
    }
}
