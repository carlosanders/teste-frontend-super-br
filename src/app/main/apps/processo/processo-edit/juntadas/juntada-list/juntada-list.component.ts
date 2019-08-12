import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Juntada} from '@cdk/models/juntada.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'juntada-list',
    templateUrl: './juntada-list.component.html',
    styleUrls: ['./juntada-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JuntadaListComponent implements OnInit {

    routerState: any;
    juntadas$: Observable<Juntada[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    desentranhandoIds$: Observable<any>;
    desentranhadoIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.JuntadaListAppState>,
    ) {
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.desentranhandoIds$ = this._store.pipe(select(fromStore.getDesentranhandoIds));
        this.desentranhadoIds$ = this._store.pipe(select(fromStore.getDesentranhadoIds));

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
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        }));
    }

    desentranhar(juntadaId: number[]): void {
        this._store.dispatch(new fromStore.DesentranharJuntada(juntadaId));
    }

}
