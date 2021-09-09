import {
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
import {Observable, Subject} from 'rxjs';

import {Assinatura, Atividade, Colaborador, ComponenteDigital, Documento, Pagination, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import * as fromStore from 'app/main/apps/tarefas/atividade-create-bloco/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {getMercureState, getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Back} from '../../../../store';
import {getSelectedTarefas} from '../store';
import {getProcessosIdsEncaminhar} from '../encaminhamento-bloco/store';
import {CdkUtils} from '@cdk/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {DynamicService} from 'modules/dynamic.service';

@Component({
    selector: 'atividade-create-bloco',
    templateUrl: './atividade-create-bloco.component.html',
    styleUrls: ['./atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateBlocoComponent implements OnInit, OnDestroy {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    processosIdsEncaminhar$: Observable<number[]>;
    processosIdsEncaminhar: number[];

    operacoes: any[] = [];

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    form: FormGroup;

    routerState: any;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedOficios: Documento[] = [];
    selectedIds$: Observable<number[]>;
    disabledIds: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    especieAtividadePagination: Pagination;

    assinaturaInterval = null;

    encerraTarefa: boolean;

    lote: string;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Colaborador;

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
        private _store: Store<fromStore.AtividadeCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            respostaDocumentoAvulso: [null],
            especieAtividade: [null, [Validators.required]],
            dataHoraConclusao: [null, [Validators.required]],
            usuario: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            documento: [null],
            tarefa: [null],
            unidadeAprovacao: [null, [Validators.required]],
            setorAprovacao: [null, [Validators.required]],
            usuarioAprovacao: [null, [Validators.required]]
        });
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.processosIdsEncaminhar$ = this._store.pipe(select(getProcessosIdsEncaminhar));

        this._store.pipe(
            select(getOperacoesState),
            takeUntil(this._unsubscribeAll),
            filter(op => !!op && !!op.content && op.type === 'atividade')
        ).subscribe((operacao) => {
            this.operacoes.push(operacao);
            this._changeDetectorRef.markForCheck();
        });

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.operacoes = [];
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.processosIdsEncaminhar$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((ids) => {
            this.processosIdsEncaminhar = ids;
        });

        this.tarefas$.pipe(
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
            if (tarefas.length) {
                this.atividade.usuario = tarefas[0].usuarioResponsavel;
                this.atividade.setor = tarefas[0].setorResponsavel;

                if (tarefas[0].especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
                } else {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefas[0].especieTarefa.generoTarefa.nome.toUpperCase()};
                }

                // caso tarefa seja de workflow verificar espécies permitidas
                this.especieAtividadePagination['context'] = {};
                if (tarefas[0].workflow) {
                    this.especieAtividadePagination.filter = {
                        'transicoesWorkflow.workflow.id': 'eq:' + tarefas[0].workflow.id
                    };
                    this.especieAtividadePagination['context'] = {tarefaId: tarefas[0].id};
                }
            } else if (this.processosIdsEncaminhar.length > 0) {
                // tslint:disable-next-line:max-line-length
                // eslint-disable-next-line max-len
                this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/encaminhamento-bloco']).then();
            }
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
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
        ).subscribe((selectedDocumentos) => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
            this.selectedOficios = selectedDocumentos.filter(documento => documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentos) => {
            this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa && !documento.juntadaAtual));
            this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa);

            this.changedSelectedIds(this.minutas.map(minuta => minuta.id));

            if (this.atividade.encerraTarefa) {
                this.disabledIds = this.minutas.map(minuta => minuta.id);
            }
            this._changeDetectorRef.markForCheck();
        });

        this.assinandoDocumentosId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((assinandoDocumentosId) => {
            if (assinandoDocumentosId.length > 0) {
                if (this.assinaturaInterval) {
                    clearInterval(this.assinaturaInterval);
                }
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
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

        this.operacoes = [];

        this.encerraTarefa = values.encerraTarefa;

        this.tarefas.forEach((tarefa) => {
            const atividade = new Atividade();

            Object.entries(values).forEach(
                ([key, value]) => {
                    atividade[key] = value;
                }
            );

            atividade.tarefa = tarefa;
            atividade.usuario = tarefa.usuarioResponsavel;
            atividade.setor = tarefa.setorResponsavel;

            if (atividade.encerraTarefa) {
                atividade.documentos = this.minutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
            } else {
                atividade.documentos = this.selectedMinutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
            }

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveAtividade({
                atividade: atividade,
                operacaoId: operacaoId
            }));
        });
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelo']).then();
    }

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/oficio']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumentoBloco(values));
    }

    doDelete(documentoId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteBloco(ids): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.doDelete(id, this.lote));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAssinaturaBloco(result): void {
        if (result.certificadoDigital) {
            const documentosId = [];
            result.documentos.forEach((documento) => {
                documentosId.push(documento.id);
            });
            this._store.dispatch(new fromStore.AssinaDocumento(documentosId));
        } else {
            const lote = CdkUtils.makeId();
            result?.documentos?.forEach((documento) => {
                documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: documento,
                        operacaoId: operacaoId,
                        loteId: lote
                    }));
                });
            });
        }
    }

    doAssinatura(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento([result.documento.id]));
        } else {
            result?.documento?.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadP7S(componenteDigital.id));
        });
    }

    changeEncerramentoTarefa(value: boolean): void {
        this.atividade.encerraTarefa = value;
        if (value) {
            const selectedIds = this.minutas.map(minuta => minuta.id);
            this.changedSelectedIds(selectedIds);
            this.disabledIds = selectedIds;
        } else {
            this.disabledIds = [];
        }
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
