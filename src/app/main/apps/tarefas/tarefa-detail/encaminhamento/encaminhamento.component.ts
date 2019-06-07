import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState} from 'app/store/reducers';
import * as fromTarefaDetailStore from '../store';
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {Tarefa} from '@cdk/models/tarefa.model';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'encaminhamento',
    templateUrl: './encaminhamento.component.html',
    styleUrls: ['./encaminhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EncaminhamentoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

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
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.EncaminhamentoAppState>,
        private _router: Router
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
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefa => {
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
            this._router.navigate([
                this.routerState.url.split('/encaminhamento')[0] + '/criar/' + this.tarefa.processo.id
            ]).then();

        }
        if (values.options === 'arquivar') {
            this._store.dispatch(new fromStore.SaveProcesso(this.tarefa.processo));
        }
        if (values.options === 'remeter') {
            this._router.navigate([
                'apps/processo/' + this.tarefa.processo.id + '/editar/tramitacoes/editar/criar'
            ]).then();
        }
    }

    cancel(): void {
        this._router.navigate(['apps/tarefas/entrada']).then();
    }
}
