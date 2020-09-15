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
import {Documento, Repositorio} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Modelo} from '@cdk/models';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';

@Component({
    selector: 'repositorio-edit-dados-basicos',
    templateUrl: './repositorio-edit-dados-basicos.component.html',
    styleUrls: ['./repositorio-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositorioEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    documento: Documento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     * @param _store
     * @param _location
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.RepositorioEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService
    ) {
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
        const path = 'app/main/apps/documento/repositorio-edit/dados-basicos';
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

    submit(values): void {

        const repositorio = new Repositorio();

        Object.entries(values).forEach(
            ([key, value]) => {
                repositorio[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveRepositorio(repositorio));
    }

}
