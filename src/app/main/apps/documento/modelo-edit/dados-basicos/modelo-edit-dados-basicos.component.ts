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
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {Documento, Modelo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'modelo-edit-dados-basicos',
    templateUrl: './modelo-edit-dados-basicos.component.html',
    styleUrls: ['./modelo-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    values: any;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _componenteDigitalService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.ModeloEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _ref: ChangeDetectorRef
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
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        this._componenteDigitalService.completedEditorSave.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((value) => {
            if (value === this.documento.id) {
                this.submit();
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/modelo-edit/dados-basicos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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
        if (!this.documento.assinado) {
            this._componenteDigitalService.doEditorSave.next(this.documento.id);
        } else {
            this.submit();
        }
    }

    submit(): void {
        this._store.dispatch(new fromStore.SaveModelo(this.values));
    }

}
