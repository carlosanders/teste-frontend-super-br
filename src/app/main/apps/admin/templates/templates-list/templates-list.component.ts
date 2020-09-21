import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Documento, Template} from '../../../../../../@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
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
        private _activatedRoute: ActivatedRoute
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
            },
            gridFilter: {
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

    editConteudo(documento: Documento): void {
        let primary: string;
        primary = 'componente-digital/';
        if (documento.componentesDigitais[0]) {
            primary += documento.componentesDigitais[0].id;
        } else {
            primary += '0';
        }
        this._router.navigate([
                'documento/' + documento.id,
                {
                    outlets:
                        {
                            primary: primary,
                            sidebar: 'template/dados-basicos'
                        }
                }
            ],
            {
                relativeTo: this._activatedRoute.parent
            }
        ).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
