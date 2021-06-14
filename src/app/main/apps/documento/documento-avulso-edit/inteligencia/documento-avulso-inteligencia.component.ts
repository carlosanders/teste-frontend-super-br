import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {ComponenteDigital, Repositorio} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import * as fromStoreComponente from '../../componente-digital/store';

@Component({
    selector: 'documento-avulso-inteligencia',
    templateUrl: './documento-avulso-inteligencia.component.html',
    styleUrls: ['./documento-avulso-inteligencia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoInteligenciaComponent implements OnInit, OnDestroy, AfterViewInit {

    loading$: Observable<boolean>;
    repositorios$: Observable<Repositorio[]>;
    pagination$: Observable<any>;
    pagination: any;

    repositorioIdLoaded$: Observable<number>;

    componenteDigital$: Observable<ComponenteDigital>;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    routerState: any;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _repositorioService
     * @param _componenteDigitalService
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditInteligenciaAppState>,
        private _location: Location,
        private _router: Router,
        private _repositorioService: RepositorioService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _dynamicService: DynamicService
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.repositorios$ = this._store.pipe(select(fromStore.getRepositorios));

        this.pagination$ = this._store.pipe(select(fromStore.getRepositoriosPagination));
        this.loading$ = this._store.pipe(select(fromStore.getRepositoriosIsLoading));

        this.repositorioIdLoaded$ = this._store.pipe(select(fromStore.getComponenteDigitalLoaded));
    }

    static b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        // tslint:disable-next-line:only-arrow-functions
        return decodeURIComponent(atob(str).split('').map(function(c): any {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.pagination$.subscribe((pagination) => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reload(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });

        this.componenteDigital$.subscribe((componenteDigital) => {
            if (componenteDigital && componenteDigital.conteudo) {
                const html = DocumentoAvulsoInteligenciaComponent.b64DecodeUnicode(componenteDigital.conteudo.split(';base64,')[1]);
                this._store.dispatch(new fromStore.SetRepositorioComponenteDigital(html));
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-avulso-edit/inteligencia';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.pagination = null;
        this._store.dispatch(new fromStore.UnloadRepositorios());
        this._store.dispatch(new fromStore.UnloadComponenteDigital());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositorios({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...this.pagination.ckeditorFilter,
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

    doDownload(repositorio: Repositorio): void {
        this._store.dispatch(new fromStore.DownloadComponenteDigital({
            componenteDigitalId: repositorio.documento.componentesDigitais[0].id,
            repositorioId: repositorio.id
        }));
    }

    showConteudo(data: any): void {
        this._store.dispatch(new fromStoreComponente.VisualizarVersaoComponenteDigital(data.toString()));
    }

}
