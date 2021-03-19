import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import * as fromStoreProtocolo from '../store';
import {Assinatura, Documento, Estado, Pagination, Pessoa, Processo, Usuario} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getMercureState, getRouterState} from '../../../../store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getPessoa} from '../store/selectors';
import {UpdateData} from '../../../../../@cdk/ngrx-normalizr';
import {documento as documentoSchema } from '@cdk/normalizr';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {DynamicService} from '../../../../../modules/dynamic.service';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoaProcedencia$: Observable<Pessoa>;
    pessoaProcedencia: Pessoa;

    unidadePagination: Pagination;
    procedenciaPagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    estados: Estado[] = [];

    documentos: Documento[] = [];
    documentos$: Observable<Documento[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;

    routerState: any;

    javaWebStartOK = false;

    selectedIndex: number;

    @ViewChild('cdkUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    titulo: string;
    paramHandle: string;

    /**
     * @param _store
     * @param _storeProtocolo
     * @param dialog
     * @param _router
     * @param _formBuilder
     * @param _changeDetectorRef
     * @param _loginService
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        private _storeProtocolo: Store<fromStoreProtocolo.ProcessosState>,
        public dialog: MatDialog,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoaProcedencia$ = this._store.pipe(select(getPessoa));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this._profile = this._loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['unidade', 'parent', 'especieSetor'];
        this.unidadePagination.filter = {'especieSetor.nome': 'eq:PROTOCOLO'};

        this.procedenciaPagination = new Pagination();
        this.procedenciaPagination.filter = {id: `in:${this._profile.vinculacoesPessoasUsuarios.map(pessoaConveniada => pessoaConveniada.pessoa.id).join(',')}`};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(message => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({id: message.content.documentoId, schema: documentoSchema, changes: {assinado: true}}));
                        break;
                }
            }
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe(
            processo => {
                this.processo = processo;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.pessoaProcedencia$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(pessoa => !!pessoa)
        ).subscribe(pessoa => {
            this.pessoaProcedencia = pessoa;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documentos => !!documentos)
        ).subscribe(
            documentos => {
                this.documentos = documentos;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.assinandoDocumentosId$.subscribe(assinandoDocumentosId => {
            if (assinandoDocumentosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });

        if  (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 2;
            this.processo.tipoProtocolo = 1;
            this.processo.protocoloEletronico = true;

            if (this._profile.vinculacoesPessoasUsuarios.length === 1) {
                this.processo.procedencia = this.pessoaProcedencia;
            }
        }

        this.getEstados();
        this.unloadProcesso();
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/protocolo-externo/protocolo-create';
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const processo = new Processo();

        delete values.estado;
        delete values.generoSetor;

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.procedencia = this.pessoaProcedencia;
        processo.titulo = values.setorAtual.especieSetor.nome;

        this._store.dispatch(new fromStore.SaveProcesso(processo));
    }

    cancel(): void {
        this._router.navigate([
            '/apps/protocolo-externo/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle
        ]).then();
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.UnloadDocumentos());
        this._store.dispatch(new fromStore.GetDocumentos({'processoOrigem.id': `eq:${this.processo.id}`}));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    getEstados(): void {
        this._store.dispatch(new fromStore.GetEstados({}));
    }

    doAssinatura(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';

                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    plainPassword: result.plainPassword,
                    processoId: this.processo.id
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doDownloadP7S(componenteDigitalId): void {
        this._store.dispatch(new fromStore.DownloadToP7S(componenteDigitalId));
    }

    unloadProcesso(): void {
        this.selectedIndex = 0;
        this.paramHandle = this.routerState.params.typeHandle;

        if (this.routerState.params.processoHandle) {
            this.selectedIndex = 1;
            this._store.dispatch(new fromStore.UnloadProcesso());
        }
    }

    doConcluir(): void {
        this._store.dispatch(new fromStore.ConcluirProcesso());
    }
}
