import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
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
import {documento as documentoSchema } from '@cdk/normalizr/documento.schema';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy {

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

    estados$: Observable<Estado[]>;
    estados: Estado[] = [];

    documentos: Documento[] = [];
    documentos$: Observable<Documento[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;

    routerState: any;

    formProcesso: FormGroup;
    javaWebStartOK = false;

    selectedIndex: number;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

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
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        private _storeProtocolo: Store<fromStoreProtocolo.ProcessosState>,
        public dialog: MatDialog,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoaProcedencia$ = this._store.pipe(select(getPessoa));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
        this.estados$ = this._store.pipe(select(fromStore.getEstados));
        this._profile = this._loginService.getUserProfile();



        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['unidade', 'parent'];
        this.unidadePagination.filter = {'especieSetor.nome': 'like:PROTOCOLO'};

        this.procedenciaPagination = new Pagination();
        this.procedenciaPagination.filter = {id: `in:${this._profile.vinculacoesPessoasUsuarios.map(pessoaConveniada => pessoaConveniada.pessoa.id).join(',')}`};

        this.formProcesso = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            NUP: [null],
            novo: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            titulo: [null],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            outroNumero: [null],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            dataHoraAbertura: [null],
            setorInicial: [null, [Validators.required]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]],
            generoSetor: [null, [Validators.required]],
            especieSetor: [null, [Validators.required]],
            estado: [null, [Validators.required]],
            requerimento: [null, [Validators.required, Validators.maxLength(255)]],
            protocoloEletronico: [null, [Validators.required]]
        });
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
                if (this.processo) {
                    this.formProcesso.value.id = this.processo.id;
                }
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

        this.estados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(estados => !!estados)
        ).subscribe(
            estados => {
                this.estados = estados;
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

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.procedencia = this.pessoaProcedencia;
        processo.titulo = this.formProcesso.get('especieSetor').value.nome;

        this._store.dispatch(new fromStore.SaveProcesso(processo));
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
                    password: result.password,
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

    unloadProcesso(): void {
        this.selectedIndex = 0;
        this.paramHandle = this.routerState.params.typeHandle;

        if (this.routerState.params.processoHandle) {
            this.selectedIndex = 1;
            this._store.dispatch(new fromStore.UnloadProcesso());
        }
    }
}
