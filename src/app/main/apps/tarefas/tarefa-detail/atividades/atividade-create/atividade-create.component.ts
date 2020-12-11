import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Assinatura, Atividade, Pagination, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models';
import {getTarefa} from '../../store/selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models';
import {getRouterState, getMercureState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '@cdk/models';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Back} from '../../../../../../store/actions';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {DynamicService} from '../../../../../../../modules/dynamic.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'atividade-create',
    templateUrl: './atividade-create.component.html',
    styleUrls: ['./atividade-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    errorEditor$: Observable<any>;
    loading$: Observable<boolean>;

    private _profile: Colaborador;

    routerState: any;

    especieAtividadePagination: Pagination;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    loadDocumentosExcluidos$: Observable<boolean>;
    lixeiraMinutas$: Observable<boolean>;
    undeletingDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    formEditor: FormGroup;

    modeloPagination: Pagination;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    routeAtividadeDocumento = 'atividade';

    mensagemErro = null;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param _dynamicService
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.AtividadeCreateAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _formBuilder: FormBuilder
    ) {
        this.tarefa$ = this._store.pipe(select(getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        this.errorEditor$ = this._store.pipe(select(fromStore.getComponentesDigitaisErrors));

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));

        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));

        this.loadDocumentosExcluidos$ = this._store.pipe(select(fromStore.getDocumentosExcluidos));
        this.lixeiraMinutas$ = this._store.pipe(select(fromStore.getLixeiraMinutas));
        this.undeletingDocumentosId$ = this._store.pipe(select(fromStore.getUnDeletingDocumentosId));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];

        this.formEditor = this._formBuilder.group({
            modelo: [null]
        });

        this.modeloPagination = new Pagination();
        this.modeloPagination.filter = {
            'modalidadeModelo.valor': 'eq:EM BRANCO'
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();

        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll),
            filter((tarefa) => !!tarefa)
        ).subscribe(tarefa => {
            this.tarefa = tarefa;
            this.atividade.tarefa = tarefa;
            this.atividade.usuario = tarefa.usuarioResponsavel;
            this.atividade.setor = tarefa.setorResponsavel;

            if (tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
            }

            // caso tarefa seja de workflow verificar espécies permitidas
            this.especieAtividadePagination['context'] = {};
            if (tarefa.workflow) {
                this.especieAtividadePagination.filter = {
                    'transicoesWorkflow.especieTarefaFrom.id' : 'eq:' + tarefa.especieTarefa.id
                };
                this.especieAtividadePagination['context'] = { tarefaId: tarefa.id };
            }

        });

        this._store.pipe(
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
                        this._store.dispatch(new UpdateData<Documento>({
                            id: message.content.documentoId,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }));
                        break;
                }
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentos => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.minutas = documentos.filter(documento =>
                    (!documento.documentoAvulsoRemessa && documento.minuta && !documento.apagadoEm));
                this._changeDetectorRef.markForCheck();

                this.lixeiraMinutas$.subscribe(lixeira => {
                    if (lixeira) {
                        this.minutas = documentos.filter(documento => (documento.apagadoEm));
                    }
                } )
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
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadDocumentos());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        delete values.unidadeAprovacao;

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        atividade.documentos = this.minutas;

        this._store.dispatch(new fromStore.SaveAtividade(atividade));
    }

    checkModelo(): void {
        const value = this.formEditor.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.formEditor.get('modelo').setValue(null);
        }
    }

    erroUpload(mensagemErro) {
        this.mensagemErro = mensagemErro;
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    doEditor(): void {
        const modelo = this.formEditor.get('modelo').value;

        //this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefa,
            routeAtividadeDocumento: this.routeAtividadeDocumento
        }));
        this.formEditor.get('modelo').setValue(null);
        this.menuTriggerList.closeMenu();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelo']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
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
                    password: result.password
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doRestaurar(documentoId): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = documentoId
        this._store.dispatch(new fromStore.UndeleteDocumento({
            documento: documento,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

    doSairLixeiraMinutas(sair): void {
        if (sair) {
            this._store.dispatch(new fromStore.GetDocumentos());
        }
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    minutasExcluidas(): void {
        this.minutas = [];
        const params = {
            filter: {'tarefaOrigem.id':'eq:' + this.tarefa.id},
            sort: {criadoEm: 'DESC'},
            populate: [
                'tipoDocumento',
                'documentoAvulsoRemessa',
                'documentoAvulsoRemessa.documentoResposta',
                'componentesDigitais',
                'juntadaAtual'
            ],
            context: {
                mostrarApagadas: true
            }
        };
        this._store.dispatch(new fromStore.GetDocumentos(params));
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos([]));
    }
}
