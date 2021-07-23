import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Inject,
    OnInit, Output,
    ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';
import {Observable, Subject} from 'rxjs';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Documento} from '@cdk/models';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'cdk-upload-dialog',
    templateUrl: './cdk-upload-dialog.component.html',
    styleUrls: ['./cdk-upload-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUploadDialogComponent implements OnInit, AfterViewInit {

    @ViewChild('cdkUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @Output()
    aprovarDocumento: EventEmitter<any> = new EventEmitter<Documento>();

    @Output()
    changeSelected: EventEmitter<number[]> = new EventEmitter<number[]>();

    @Output()
    deleteDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    assina: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    alteraTipoDocumento: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    downloadP7S: EventEmitter<Documento> = new EventEmitter<Documento>();

    @Output()
    completeDocumentoVinculado: EventEmitter<Documento> = new EventEmitter<Documento>();

    @Output()
    atualizaDocumentosVinculados: EventEmitter<Documento> = new EventEmitter<Documento>();

    @Output()
    removeAssinatura: EventEmitter<any> = new EventEmitter<any>();

    saving$: Subject<boolean>;
    saving: boolean;

    documento: Documento;
    documentosVinculados$: Observable<Documento[]>;
    isLoading$: Observable<boolean>;
    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    removendoAssinaturaDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    lote: string;

    /**
     *
     * @param _changeDetectorRef
     * @param dialogRef
     * @param data
     * @param _dynamicService
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CdkUploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dynamicService: DynamicService,
        public _loginService: LoginService
    ) {
        this.documento = data.documento;
        this.saving$ = data.saving$;
        this.isLoading$ = data.isLoading$;
        this.documentosVinculados$ = data.documentosVinculados$;
        this.selectedDocumentosVinculados$ = data.selectedDocumentosVinculados$;
        this.deletingDocumentosVinculadosId$ = data.deletingDocumentosVinculadosId$;
        this.assinandoDocumentosVinculadosId$ = data.assinandoDocumentosVinculadosId$;
        this.removendoAssinaturaDocumentosVinculadosId$ = data.removendoAssinaturaDocumentosVinculadosId$;
        this.alterandoDocumentosId$ = data.alterandoDocumentosId$;
        this.downloadP7SDocumentosId$ = data.downloadP7SDocumentosId$;
    }

    ngOnInit(): void {
        this.assinandoDocumentosVinculadosId$.subscribe((assinandoDocumentosVinculadosId) => {
            this.assinandoDocumentosVinculadosId = assinandoDocumentosVinculadosId;
        });
        this.saving$.subscribe((value) => {
            this.saving = value;
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/anexos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    aprovar(): void {
        this.aprovarDocumento.emit(this.documento);
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this.changeSelected.emit(selectedIds);
    }

    onClickedDocumentoVinculado(documento): void {
    }

    doDeleteDocumentoVinculado(documentoId: number, loteId: string = null): void {
        this.deleteDocumento.emit({
            documentoId: documentoId,
            loteId: loteId
        });
    }

    doDeleteBloco(documentosId: number[]): void {
        this.lote = CdkUtils.makeId();
        documentosId.forEach((documentoId: number) => this.doDeleteDocumentoVinculado(documentoId));
    }

    doAssinaturaDocumentoVinculado(result): void {
        this.assina.emit(result);
    }

    doAlterarTipoDocumento(values): void {
        this.alteraTipoDocumento.emit(values);
    }

    doDownloadP7S(documento: Documento): void {
        this.downloadP7S.emit(documento);
    }

    onCompleteDocumentoVinculado(): void {
        this.completeDocumentoVinculado.emit(this.documento);
    }

    onCompleteAllDocumentosVinculados(): void {
        this.atualizaDocumentosVinculados.emit(this.documento);
    }

    doRemoveAssinatura(documentoId: number): void {
        this.removeAssinatura.emit(documentoId);
    }
}
