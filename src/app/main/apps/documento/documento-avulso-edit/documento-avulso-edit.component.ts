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
import * as fromStore from '../store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Documento} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
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

    /**
     * Criando ponto de entrada para o componente de anexos
     */
    @ViewChild('dynamicAnexos', {static: false, read: ViewContainerRef}) containerAnexos: ViewContainerRef;

    /**
     * Criando ponto de entrada para o componente de inteligência
     */
    @ViewChild('dynamicInteligencia', {static: false, read: ViewContainerRef}) containerInteligencia: ViewContainerRef;

    routerState: any;

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _router
     * @param _ref
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _router: Router,
        private _ref: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute
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
            }
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
}
