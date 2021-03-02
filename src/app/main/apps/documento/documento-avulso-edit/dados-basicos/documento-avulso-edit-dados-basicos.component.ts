import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Documento, DocumentoAvulso} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'documento-avulso-edit-dados-basicos',
    templateUrl: './documento-avulso-edit-dados-basicos.component.html',
    styleUrls: ['./documento-avulso-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    isRemetendo$: Observable<boolean>;
    errors$: Observable<any>;

    /**
     * Criando ponto de entrada para extensões do componente de edição de documento avulso, permitindo
     * adicionar botões de remessa diferentes da remessa manual
     */
    @ViewChild('dynamicButtons', {static: false, read: ViewContainerRef}) containerButtons: ViewContainerRef;

    /**
     * Criando ponto de entrada para extensões do componente de edição de documento avulso, permitindo
     * informar status da remessa oriundos de módulos diferentes da remessa manual
     */
    @ViewChild('dynamicStatus', {static: false, read: ViewContainerRef}) containerStatus: ViewContainerRef;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _componenteDigitalService
     * @param _ref
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _ref: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.isRemetendo$ = this._store.pipe(select(fromStore.getIsRemetendo));
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
                this._store.dispatch(new fromStore.RemeterDocumentoAvulso(this.documento.documentoAvulsoRemessa));
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-avulso-edit';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    iniciaModulos(): void {
        const path1 = 'app/main/apps/documento/documento-avulso-edit#buttons';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
                            this.containerButtons.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
        const path2 = 'app/main/apps/documento/documento-avulso-edit#status';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path2)) {
                module.components[path2].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
                            this.containerStatus.createComponent(componentFactory);
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    remeterDocumentoAvulso(): void {
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
            },
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Esta operaçao nao pode ser desfeita. Deseja realmente remeter o oficio?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._componenteDigitalService.doEditorSave.next(this.documento.id);
            }
            this.confirmDialogRef = null;
        });
    }

    toggleEncerramento(): void {
        this._store.dispatch(new fromStore.ToggleEncerramentoDocumentoAvulso(this.documento.documentoAvulsoRemessa));
    }

    submit(values): void {

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));
    }

}
