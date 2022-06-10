import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {cdkAnimations} from '@cdk/animations';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';
import {ConfigModulo, Modulo} from '../../../../../../@cdk/models';
import {CdkUtils} from "../../../../../../@cdk/utils";

@Component({
    selector: 'config-modulo-list',
    templateUrl: './config-modulo-list.component.html',
    styleUrls: ['./config-modulo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ConfigModuloListComponent implements OnInit {

    routerState: any;
    configModules$: Observable<ConfigModulo[]>;
    modulos$: Observable<Modulo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ConfigModuleListAppState>
    ) {
        this.configModules$ = this._store.pipe(select(fromStore.getConfigModuleList));
        this.modulos$ = this._store.pipe(select(fromStore.ModuloSelectors.getModuloList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetConfigModule({
            ...this.pagination,
            filter: {
                ...params.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(configModuleId: number): void {
        this._router.navigate(
            [this.routerState.url.replace('listar', 'editar/') + configModuleId]
        ).then();
    }

    editAdmin(configModuleId: number): void {
        this._router.navigate(
            [this.routerState.url.replace('listar', 'editar_admin/') + configModuleId]
        ).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(configModuloId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteConfigModule({
            configModuloId: configModuloId,
            operacaoId: operacaoId,
            loteId: loteId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
