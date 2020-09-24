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
import {Template} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';

@Component({
    selector: 'template-edit-dados-basicos',
    templateUrl: './template-edit-dados-basicos.component.html',
    styleUrls: ['./template-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TemplateEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    template$: Observable<Template>;
    isSaving$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    errors$: Observable<any>;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     * @param _store
     * @param _location
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.TemplateEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService
    ) {
        this.template$ = this._store.pipe(select(fromStore.getTemplate));
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
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/template-edit/dados-basicos';
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
        this._store.dispatch(new fromStore.UnloadTemplate());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const template = new Template();

        Object.entries(values).forEach(
            ([key, value]) => {
                template[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveTemplate(template));
    }

}
