import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import * as fromStoreComponente from '../../componente-digital/store';
import {ComponenteDigital, Repositorio} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'documento-edit-inteligencia',
    templateUrl: './documento-edit-inteligencia.component.html',
    styleUrls: ['./documento-edit-inteligencia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditInteligenciaComponent implements OnInit, OnDestroy {

    loading$: Observable<boolean>;
    repositorios$: Observable<Repositorio[]>;
    pagination$: Observable<any>;
    pagination: any;
    repositorioIdLoaded$: Observable<number>;
    componenteDigital$: Observable<ComponenteDigital>;
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _repositorioService
     * @param _componenteDigitalService
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditInteligenciaAppState>,
        private _location: Location,
        private _router: Router,
        private _repositorioService: RepositorioService,
        private _componenteDigitalService: ComponenteDigitalService,
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
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            if (this.pagination && pagination && pagination.ckeditorFilter && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reload(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });

        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((componenteDigital) => {
            if (componenteDigital && componenteDigital.conteudo) {
                const html = DocumentoEditInteligenciaComponent.b64DecodeUnicode(componenteDigital.conteudo.split(';base64,')[1]);
                this._store.dispatch(new fromStore.SetRepositorioComponenteDigital(html));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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
