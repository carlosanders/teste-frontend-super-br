import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Pessoa} from '@cdk/models/pessoa.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pessoa/pessoa-list/store';
import {getRouterState} from '../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'pessoa-list',
    templateUrl: './pessoa-list.component.html',
    styleUrls: ['./pessoa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PessoaListComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    pessoas$: Observable<Pessoa[]>;
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
        private _store: Store<fromStore.PessoaListAppState>,
    ) {
        this.pessoas$ = this._store.pipe(select(fromStore.getPessoaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

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
        this._store.dispatch(new fromStore.GetPessoas({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(pessoaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + pessoaId]);
    }

    delete(pessoaId: number): void {
        this._store.dispatch(new fromStore.DeletePessoa(pessoaId));
    }

}
