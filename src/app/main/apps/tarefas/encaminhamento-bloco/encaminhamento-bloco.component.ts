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
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'encaminhamento-bloco',
    templateUrl: './encaminhamento-bloco.component.html',
    styleUrls: ['./encaminhamento-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EncaminhamentoBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    routerState: any;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processos$: Observable<Processo[]>;
    processos: Processo[];

    action = 'buttons';

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
        this.processos$ = this._store.pipe(select(fromStore.getProcessosEncaminhamento));
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
                if (this.routerState.url.indexOf('criar-tarefas-bloco') !== -1 || this.routerState.url.indexOf('remeter-processos-bloco') !== -1) {
                    this.action = 'form';
                } else {
                    this.action = 'buttons';
                }
                this._changeDetectorRef.detectChanges();
            }
        });

        this.processos$.pipe(
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processos) => {
            this.processos = processos;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._store.dispatch(new fromStore.UnloadEncaminhamentoBloco());

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(values): void {
        if (values.options === 'criar_tarefa') {
            this._router.navigate(['apps/tarefas/' + this.routerState.params['generoHandle'] + '/' + this.routerState.params['typeHandle'] + '/entrada/encaminhamento-bloco/criar-tarefas-bloco']).then();
        }
        if (values.options === 'arquivar') {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                },
                disableClose: false
            });

            const nupsFormatados = this.processos.map(processo => processo.NUPFormatado).join(', ');

            this.confirmDialogRef.componentInstance.confirmMessage = 'Deseja realmente arquivar os processo ' + nupsFormatados + '?';
            this.confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.processos.forEach(processo => {
                        this._store.dispatch(new fromStore.SaveProcesso(processo));
                    });
                }
                this.confirmDialogRef = null;
            });
        }
        if (values.options === 'remeter') {
            this._router.navigate([
                'apps/tarefas/' + this.routerState.params['generoHandle'] + '/' + this.routerState.params['typeHandle'] + '/entrada/encaminhamento-bloco/remeter-processos-bloco'
            ]).then();
        }
    }

    cancel(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params['generoHandle'] + '/' + this.routerState.params['typeHandle'] + '/entrada']).then();
    }
}