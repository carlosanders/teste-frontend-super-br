import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Notificacao} from '@cdk/models/notificacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'notificacao-list',
    templateUrl: './notificacao-list.component.html',
    styleUrls: ['./notificacao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotificacaoListComponent implements OnInit {

    routerState: any;
    notificacoes$: Observable<Notificacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.NotificacaoListAppState>,
    ) {
        this.notificacoes$ = this._store.pipe(select(fromStore.getNotificacaoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetNotificacoes({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(notificacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + notificacaoId]);
    }

    delete(notificacaoId: number): void {
        this._store.dispatch(new fromStore.DeleteNotificacao(notificacaoId));
    }

}