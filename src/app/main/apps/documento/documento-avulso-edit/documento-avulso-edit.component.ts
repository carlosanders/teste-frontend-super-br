import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation,
    ChangeDetectorRef, ViewContainerRef
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Documento} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';

@Component({
    selector: 'documento-avulso-edit',
    templateUrl: './documento-avulso-edit.component.html',
    styleUrls: ['./documento-avulso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;

    documento: Documento;

    activeCard = '';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    /**
     * Criando ponto de entrada para o componente de anexos
     */
    @ViewChild('dynamicAnexos', {static: false, read: ViewContainerRef}) containerAnexos: ViewContainerRef;

    /**
     * Criando ponto de entrada para o componente de inteligência
     */
    @ViewChild('dynamicInteligencia', {static: false, read: ViewContainerRef}) containerInteligencia: ViewContainerRef;

    routerState: any;

    inteligencia: any = () => import('./inteligencia/documento-avulso-inteligencia.module')
        .then(m => m.DocumentoAvulsoInteligenciaModule)

    anexos: any = () => import('./anexos/documento-avulso-edit-anexos.module')
        .then(m => m.DocumentoAvulsoEditAnexosModule)

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _router
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _router: Router,
        private _ref: ChangeDetectorRef
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.subscribe(documento => this.documento = documento);

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;

                this.activeCard = this.routerState.params['sidebarHandle'];
                this._ref.detectChanges();
                // if (this.activeCard === 'inteligencia') {
                //     this.iniciaInteligencia();
                // }
                // if (this.activeCard === 'anexos') {
                //     this.iniciaAnexos();
                // }
            }
        });
    }

    iniciaInteligencia(): void {
        this._dynamicService.loadComponent(this.inteligencia)
            .then(componentFactory => {
                this.containerInteligencia.createComponent(componentFactory);
                this._ref.markForCheck();
            });
    }

    iniciaAnexos(): void {
        this._dynamicService.loadComponent(this.anexos)
            .then(componentFactory => {
                this.containerAnexos.createComponent(componentFactory);
                this._ref.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    back(): void {
        this._location.back();
    }

    showForm(): void {
        if (this.activeCard !== 'dados-basicos') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'dados-basicos')])
                .then();
        }
    }

    showAnexos(): void {
        if (this.activeCard !== 'anexos') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'anexos')])
                .then();
        }
    }

    showInteligencia(): void {
        if (this.activeCard !== 'inteligencia') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'inteligencia')])
                .then();
        }
    }
}
