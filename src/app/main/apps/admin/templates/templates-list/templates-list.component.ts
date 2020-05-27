import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Template} from '../../../../../../@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'templates-list',
    templateUrl: './templates-list.component.html',
    styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

    routerState: any;
    templates$: Observable<Template[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TemplatesListAppState>,
    ) {
        this.templates$ = this._store.pipe(select(fromStore.getTemplatesList));
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

    reload(params): void {
        this._store.dispatch(new fromStore.GetTemplates({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    edit(templateId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + templateId]);
    }

    editConteudo(documentoId: number): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoId + '/template']).then();
    }

    create() {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
