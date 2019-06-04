import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Processo} from '@cdk/models/processo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/processos/store';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'processos',
    templateUrl: './processos.component.html',
    styleUrls: ['./processos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessosComponent implements OnInit {

    routerState: any;
    processos$: Observable<Processo[]>;
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
        private _store: Store<fromStore.ProcessosAppState>,
    ) {
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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
        this._store.dispatch(new fromStore.GetProcessos({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(processoId: number): void {
        this._router.navigate(['apps/processo/' + processoId + '/editar']);
    }
}
