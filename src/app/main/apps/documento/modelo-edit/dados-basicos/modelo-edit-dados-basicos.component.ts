import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, Input,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Modelo} from '@cdk/models';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ComponenteDigitalService} from "../../../../../../@cdk/services/componente-digital.service";

@Component({
    selector: 'modelo-edit-dados-basicos',
    templateUrl: './modelo-edit-dados-basicos.component.html',
    styleUrls: ['./modelo-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    values: any;

    /**
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _componenteDigitalService
     */
    constructor(
        private _store: Store<fromStore.ModeloEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.subscribe(documento => this.documento = documento);

        this._componenteDigitalService.completedEditorSave.subscribe((value) => {
            if (value === this.documento.id) {
                this.submit();
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/modelo-edit/dados-basicos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    preSubmit(values): void {
        const modelo = new Modelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        this.values = modelo;
        this._componenteDigitalService.doEditorSave.next(this.documento.id);
    }

    submit(): void {
        this._store.dispatch(new fromStore.SaveModelo(this.values));
    }

}
