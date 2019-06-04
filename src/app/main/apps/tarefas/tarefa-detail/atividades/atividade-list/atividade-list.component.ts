import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Atividade} from '@cdk/models/atividade.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'atividade-list',
    templateUrl: './atividade-list.component.html',
    styleUrls: ['./atividade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AtividadeListComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    atividades$: Observable<Atividade[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.AtividadeListAppState>,
    ) {
        this.atividades$ = this._store.pipe(select(fromStore.getAtividadeList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetAtividades({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

}
