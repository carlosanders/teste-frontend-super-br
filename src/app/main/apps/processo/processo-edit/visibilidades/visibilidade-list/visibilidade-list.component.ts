import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Visibilidade} from '@cdk/models/visibilidade.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'visibilidade-list',
    templateUrl: './visibilidade-list.component.html',
    styleUrls: ['./visibilidade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VisibilidadeListComponent implements OnInit {

    routerState: any;
    visibilidades$: Observable<Visibilidade[]>;
    loading$: Observable<boolean>;
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
        private _store: Store<fromStore.VisibilidadeListAppState>,
    ) {
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
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
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVisibilidades(params));
    }

    delete(visibilidadeId: number): void {
        this._store.dispatch(new fromStore.DeleteVisibilidade({processoId: this.routerState.params.processoHandle, visibilidadeId: visibilidadeId}));
    }

}
