import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
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
import {CdkUtils} from '@cdk/utils';

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
    errorsRemetendo$: Observable<any>;
    errorsRemetendo: any;

    remeterDocAvulso = false;

    /**
     * Criando ponto de entrada para extensões do componente de edição de documento avulso, permitindo
     * informar status da remessa oriundos de módulos diferentes da remessa manual
     */
    @ViewChild('dynamicStatus', {static: false, read: ViewContainerRef}) containerStatus: ViewContainerRef;

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
        this.errorsRemetendo$ = this._store.pipe(select(fromStore.getErrorsRemetendo));
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
            if (value === this.documento.id && this.remeterDocAvulso) {
                this._store.dispatch(new fromStore.RemeterDocumentoAvulso(this.documento.documentoAvulsoRemessa));
            }
        });

        this.errorsRemetendo$.subscribe(err => this.errorsRemetendo = CdkUtils.errorsToString(err));
    }

    ngAfterViewInit(): void {}

    iniciaModulos(): void {
        const path2 = 'app/main/apps/documento/documento-avulso-edit#status';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path2)) {
                module.components[path2].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then( (componentFactory)  => {
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
        this.remeterDocAvulso = false;
        this._store.dispatch(new fromStore.UnloadDocumentoAvulso());
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
                message: 'Esta operação não pode ser desfeita. Deseja realmente remeter o ofício?'
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (!this.documento.assinado){
                    this.remeterDocAvulso = true;
                    this._componenteDigitalService.doEditorSave.next(this.documento.id);
                }
            }
            this.confirmDialogRef = null;
        });
    }

    toggleEncerramento(): void {
        this._store.dispatch(new fromStore.ToggleEncerramentoDocumentoAvulso(this.documento.documentoAvulsoRemessa));
    }

    submit(values): void {

        if (!this.documento.assinado && this.documento.componentesDigitais[0].editavel) {
            this.remeterDocAvulso = false;
            this._componenteDigitalService.doEditorSave.next(this.documento.id);
        }

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));
    }

}
