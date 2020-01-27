import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation,
    ChangeDetectorRef, ViewContainerRef, AfterViewInit
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from '../store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Documento} from '@cdk/models/documento.model';
import {Router} from '@angular/router';
import {getMercureState, getRouterState} from '../../../../store/reducers';
import {Repositorio} from '@cdk/models/repositorio.model';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {modulesConfig} from "../../../../../modules/modules-config";
import {DynamicService} from "../../../../../modules/dynamic.service";

@Component({
    selector: 'documento-avulso-edit',
    templateUrl: './documento-avulso-edit.component.html',
    styleUrls: ['./documento-avulso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoAvulsoEditComponent implements OnInit, OnDestroy, AfterViewInit {

    /**
     * @param _store
     * @param _location
     * @param _router
     * @param _repositorioService
     * @param _dynamicService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _router: Router,
        private _repositorioService: RepositorioService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.isSaving$ = this._store.pipe(select(fromStore.getDocumentoAvulsoIsSaving));
        this.isRemetendo$ = this._store.pipe(select(fromStore.getDocumentoAvulsoIsRemetendo));
        this.errors$ = this._store.pipe(select(fromStore.getDocumentoAvulsoErrors));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosVinculadosId));

        this.repositorios$ = this._store.pipe(select(fromStore.getRepositorios));
        this.pagination$ = this._store.pipe(select(fromStore.getRepositoriosPagination));
        this.loading$ = this._store.pipe(select(fromStore.getRepositoriosIsLoading));

        this.repositorioIdLoadind$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));
        this.repositorioIdLoaded$ = this._store.pipe(select(fromStore.getComponenteDigitalLoaded));

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

    documento$: Observable<Documento>;
    documentosVinculados$: Observable<Documento[]>;
    documento: Documento;
    isSaving$: Observable<boolean>;
    isRemetendo$: Observable<boolean>;
    errors$: Observable<any>;

    loading$: Observable<boolean>;
    repositorios$: Observable<Repositorio[]>;
    pagination$: Observable<any>;
    pagination: any;

    repositorioIdLoadind$: Observable<number>;
    repositorioIdLoaded$: Observable<number>;

    componenteDigital$: Observable<ComponenteDigital>;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;

    activeCard = 'oficio';

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

    modulesButtons: any[] = [];

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    routerState: any;

    acompanharResposta = false;

    static b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        // tslint:disable-next-line:only-arrow-functions
        return decodeURIComponent(atob(str).split('').map(function(c): any {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    ngAfterViewInit(): void {
        this.iniciaModulos();
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

        this.pagination$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter && this.activeCard === 'inteligencia') {
                this.pagination = pagination;
                this.reload(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });

        this.componenteDigital$.subscribe(componenteDigital => {
            if (componenteDigital && componenteDigital.conteudo) {
                const html = DocumentoAvulsoEditComponent.b64DecodeUnicode(componenteDigital.conteudo.split(';base64,')[1]);
                this._store.dispatch(new fromStore.SetRepositorioComponenteDigital(html));
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
                            this.containerButtons.createComponent(componentFactory)
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
                            this.containerStatus.createComponent(componentFactory)
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

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositorios({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...this.pagination.ckeditorFilter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doDownload(repositorio: Repositorio): void {
        this._store.dispatch(new fromStore.DownloadComponenteDigital({
            componenteDigitalId: repositorio.documento.componentesDigitais[0].id,
            repositorioId: repositorio.id
        }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    remeterDocumentoAvulso(): void {
        this._store.dispatch(new fromStore.RemeterDocumentoAvulso(this.documento.documentoAvulsoRemessa));
    }

    toggleEncerramento(): void {
        this._store.dispatch(new fromStore.ToggleEncerramentoDocumentoAvulso(this.documento.documentoAvulsoRemessa));
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

    submit(values): void {

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));
    }

    showForm(): void {
        this.activeCard = 'oficio';
        this._ref.detectChanges();
        this.iniciaModulos();
    }

    showAnexos(): void {
        this.activeCard = 'anexos';
    }

    showInteligencia(): void {
        this.activeCard = 'inteligencia';
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    anexarCopia(): void {
        this._router.navigate([
                this.routerState.url.split(this.routerState.params.documentoHandle + '/oficio')[0] +
                this.routerState.params.documentoHandle + '/oficio/anexar-copia/' + this.documento.processoOrigem.id + '/visualizar'
            ]
        ).then();
    }

}
