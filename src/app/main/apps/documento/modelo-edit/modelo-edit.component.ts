import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getMercureState} from 'app/store/reducers';
import {Modelo} from '@cdk/models';

@Component({
    selector: 'modelo-edit',
    templateUrl: './modelo-edit.component.html',
    styleUrls: ['./modelo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloEditComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;
    documentosVinculados$: Observable<Documento[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;

    documentoPrincipal: Documento;

    activeCard = 'anexos';

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    /**
     * @param _store
     * @param _location
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosVinculadosId));

        this._store
            .pipe(
                select(getMercureState),
            ).subscribe(message => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoSuccess(message.content.documentoId));
                        break;
                }
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.assinandoDocumentosVinculadosId$.subscribe(assinandoDocumentosVinculadosId => {
            if (assinandoDocumentosVinculadosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosVinculadosId.length > 0)) {
                        assinandoDocumentosVinculadosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosVinculadosId = assinandoDocumentosVinculadosId;
        });

        this.documento$.subscribe(documento => {
           if (documento && documento.vinculacaoDocumentoPrincipal) {
               this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
               this.activeCard = 'form';
           } else {
               this.activeCard = 'anexos';
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

    upload(): void {
        this.cdkUpload.upload();
    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado(documentoId));
    }

    doAssinaturaDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.AssinaDocumentoVinculado(documentoId));
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.GetDocumentosVinculados());
    }

    back(): void {
        this._location.back();
    }

    showAnexos(): void {
        this.activeCard = 'anexos';
    }

    showForm(): void {
        this.activeCard = 'form';
    }

    submit(values): void {

        const modelo = new Modelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveModelo(modelo));
    }

}

