import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Juntada, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../auth/login/login.service';

@Component({
    selector: 'documento-edit-juntada',
    templateUrl: './documento-edit-juntada.component.html',
    styleUrls: ['./documento-edit-juntada.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditJuntadaComponent implements OnInit, OnDestroy, AfterViewInit {

    juntada$: Observable<Juntada>;
    juntada: Juntada;
    juntadaIsSaving$: Observable<boolean>;
    juntadaErrors$: Observable<any>;
    formJuntada: FormGroup;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    logEntryPagination: Pagination;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditJuntadaAppState>,
        private _location: Location,
        private _router: Router,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));
        this.juntadaIsSaving$ = this._store.pipe(select(fromStore.getJuntadaIsSaving));
        this.juntadaErrors$ = this._store.pipe(select(fromStore.getJuntadaErrors));

        this.logEntryPagination = new Pagination();

        this.formJuntada = this._formBuilder.group({
            id: [null],
            ativo: [null],
            numeracaoSequencial: [null],
            documento: [null],
            descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4000)]],
            origemDados: [null],
            volume: [null],
            documentoAvulso: [null],
            atividade: [null],
            tarefa: [null]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.juntada$.subscribe(juntada => {
            this.juntada = juntada;

            if (this.juntada) {
                this.logEntryPagination.filter = {
                    entity: 'SuppCore\\AdministrativoBackend\\Entity\\Juntada',
                    id: this.juntada.id
                };
            }
        });

    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/juntada';
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
        this._store.dispatch(new fromStore.UnloadJuntada());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitJuntada(values): void {

        const juntada = new Juntada();

        Object.entries(values).forEach(
            ([key, value]) => {
                juntada[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveJuntada(juntada));
    }

}
