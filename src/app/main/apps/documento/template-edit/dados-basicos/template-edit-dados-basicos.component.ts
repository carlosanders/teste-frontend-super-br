import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Documento, Template} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Component({
    selector: 'template-edit-dados-basicos',
    templateUrl: './template-edit-dados-basicos.component.html',
    styleUrls: ['./template-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TemplateEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;
    documento: Documento;

    template$: Observable<Template>;
    isSaving$: Observable<boolean>;
    isLoading$: Observable<boolean>;
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
        private _store: Store<fromStore.TemplateEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this.template$ = this._store.pipe(select(fromStore.getTemplate));
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
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
        const path = 'app/main/apps/documento/template-edit/dados-basicos';
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
        this._store.dispatch(new fromStore.UnloadTemplate());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    preSubmit(values): void {
        const template = new Template();

        Object.entries(values).forEach(
            ([key, value]) => {
                template[key] = value;
            }
        );

        this.values = template;
        if (!this.documento.assinado){
            this._componenteDigitalService.doEditorSave.next(this.documento.id);
        } else {
            this.submit();
        }
    }

    submit(): void {
        this._store.dispatch(new fromStore.SaveTemplate(this.values));
    }

}
