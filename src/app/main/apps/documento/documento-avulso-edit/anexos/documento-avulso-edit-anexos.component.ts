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
import {Assinatura, Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ActivatedRoute, Router} from '@angular/router';
import {getDocumento} from '../../store/selectors';

@Component({
    selector: 'documento-avulso-edit-anexos',
    templateUrl: './documento-avulso-edit-anexos.component.html',
    styleUrls: ['./documento-avulso-edit-anexos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditAnexosComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;

    documento: Documento;

    documentosVinculados$: Observable<Documento[]>;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    routerState: any;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _dynamicService
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditAnexosAppState>,
        private _location: Location,
        private _router: Router,
        private _dynamicService: DynamicService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.documento$ = this._store.pipe(select(getDocumento));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
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
        this.documento$.subscribe(documento => this.documento = documento);

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

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-avulso-edit/anexos';
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

    upload(): void {
        this.cdkUpload.upload();
    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado(documentoId));
    }

    doAssinaturaDocumentoVinculado(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumentoVinculado(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';

                this._store.dispatch(new fromStore.AssinaDocumentoVinculadoEletronicamente({
                    assinatura: assinatura,
                    password: result.password
                }));
            });
        }
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.GetDocumentosVinculados());
    }

    anexarCopia(): void {
        const rota = 'anexar-copia/' + this.documento.processoOrigem.id + '/visualizar';
        this._router.navigate(
            [
                this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent}).then();
    }

}
