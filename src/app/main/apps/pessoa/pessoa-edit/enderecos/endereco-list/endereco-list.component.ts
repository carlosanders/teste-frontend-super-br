import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Endereco} from '@cdk/models/endereco.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'endereco-list',
    templateUrl: './endereco-list.component.html',
    styleUrls: ['./endereco-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EnderecoListComponent implements OnInit {

    routerState: any;
    enderecos$: Observable<Endereco[]>;
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
        private _store: Store<fromStore.EnderecoListAppState>,
    ) {
        this.enderecos$ = this._store.pipe(select(fromStore.getEnderecoList));
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
        this._store.dispatch(new fromStore.GetEnderecos({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(enderecoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + enderecoId]);
    }

    delete(enderecoId: number): void {
        this._store.dispatch(new fromStore.DeleteEndereco(enderecoId));
    }

}
