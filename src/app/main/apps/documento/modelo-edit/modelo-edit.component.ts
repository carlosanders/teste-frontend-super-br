import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {ClickedDocumentoVinculado} from './anexos/store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'modelo-edit',
    templateUrl: './modelo-edit.component.html',
    styleUrls: ['./modelo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloEditComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;

    documentoPrincipal: Documento;

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _router
     * @param _activatedRoute
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef
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
        this.documento$.subscribe((documento) => {
            if (documento && documento.estaVinculada) {
                this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/modelo-edit';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
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

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new ClickedDocumentoVinculado(documento));
    }

    back(): void {
        this._location.back();
    }

    showAnexos(): void {
        this._router.navigate(['anexos'], {relativeTo: this._activatedRoute.parent});
    }

    showForm(): void {
        this._router.navigate(['dados-basicos'], {relativeTo: this._activatedRoute.parent});
    }

}

