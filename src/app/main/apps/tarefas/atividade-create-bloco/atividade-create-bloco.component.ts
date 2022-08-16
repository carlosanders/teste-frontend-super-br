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
import * as AssinaturaStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {Back, getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {getSelectedTarefas} from '../store';
import {getProcessosIdsEncaminhar} from '../encaminhamento-bloco/store';
import {CdkUtils} from '@cdk/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {DynamicService} from 'modules/dynamic.service';
import * as _ from 'lodash'

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
    documentos: Documento[] = [];
    minutas: Documento[] = [];
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedOficios: Documento[] = [];
    selectedIds$: Observable<number[]>;
    disabledIds: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    isLoading$: Observable<boolean>;

    especieAtividadePagination: Pagination;

    encerraTarefa: boolean;

    lote: string;
    loteAtividades: string;

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
            usuarioAprovacao: [null, [Validators.required]],
            unidadeResponsavel: [null, [Validators.required]],
            setorResponsavel: [null, [Validators.required]],
            usuarioResponsavel: [null],
            distribuicaoAutomatica: [null],
        });
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.processosIdsEncaminhar$ = this._store.pipe(select(getProcessosIdsEncaminhar));

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'atividade' && operacao.lote === this.loteAtividades);
            this._changeDetectorRef.markForCheck();
        });

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoadingDocumentos));

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
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

                this.verificaFilterWorkflow();
            } else if (this.processosIdsEncaminhar.length > 0) {
                // tslint:disable-next-line:max-line-length
                // eslint-disable-next-line max-len
                this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/encaminhamento-bloco']).then();
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
            this.documentos = documentos;
            this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa && !documento.juntadaAtual));
            this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa);

            this.changedSelectedIds(this.minutas.map(minuta => minuta.id));

            if (this.atividade.encerraTarefa) {
                this.disabledIds = this.minutas.map(minuta => minuta.id);
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadAtividade());
        this._store.dispatch(new fromStore.UnloadDocumentos());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        delete values.unidadeAprovacao;

        this.operacoes = [];
        this.loteAtividades = CdkUtils.makeId();
        this.encerraTarefa = values.encerraTarefa;

        const tarefasGroupedByProcesso = _.groupBy(this.tarefas, tarefa => tarefa.processo.id);

        const tarefasLineares = [];
        const tarefasBloco = [];

        Object.keys(tarefasGroupedByProcesso).forEach((processoId) => {
            if (tarefasGroupedByProcesso[processoId].length > 1) {
                tarefasLineares.push(tarefasGroupedByProcesso[processoId]);
            } else {
                tarefasBloco.push(...tarefasGroupedByProcesso[processoId]);
            }
        })

        tarefasBloco.forEach((tarefa) => {
            const atividade = new Atividade();

            Object.entries(values).forEach(
                ([key, value]) => {
                    atividade[key] = value;
                }
            );

            atividade.tarefa = tarefa;
            atividade.usuario = tarefa.usuarioResponsavel;
            atividade.setor = tarefa.setorResponsavel;

            if (tarefa.vinculacaoWorkflow) {
                atividade.setorResponsavel = tarefa.setorResponsavel;
                atividade.usuarioResponsavel = tarefa.usuarioResponsavel;
            }

            if (atividade.encerraTarefa) {
                atividade.documentos = this.minutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
            } else {
                atividade.documentos = this.selectedMinutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
            }

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveAtividade({
                atividade: atividade,
                operacaoId: operacaoId,
                loteId: this.loteAtividades
            }));
        });
        const atividadesLineares = [];
        tarefasLineares.forEach((tarefasProcesso) => {
            const atividadesProcesso = tarefasProcesso.map(tarefa => {
                const atividade = new Atividade();
                Object.entries(values).forEach(
                    ([key, value]) => {
                        atividade[key] = value;
                    }
                );
                atividade.tarefa = tarefa;
                atividade.usuario = tarefa.usuarioResponsavel;
                atividade.setor = tarefa.setorResponsavel;

                if (tarefa.vinculacaoWorkflow) {
                    atividade.setorResponsavel = tarefa.setorResponsavel;
                    atividade.usuarioResponsavel = tarefa.usuarioResponsavel;
                }

                if (atividade.encerraTarefa) {
                    atividade.documentos = this.minutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
                } else {
                    atividade.documentos = this.selectedMinutas.filter(minuta => minuta.tarefaOrigem.id === tarefa.id);
                }
                return atividade;
            });
            atividadesLineares.push(atividadesProcesso);
        });
        atividadesLineares.forEach(atividades => this._store.dispatch(new fromStore.SaveAtividadesLineares({
            atividadesLineares: atividades,
            loteId: this.loteAtividades
        })));
    }

    verificaFilterWorkflow(): void {
        if (this.tarefas.length) {
            const tarefasWorkflow = this.tarefas.filter((tarefa: Tarefa) => tarefa.vinculacaoWorkflow);
            this.especieAtividadePagination['context'] = {};
            if (tarefasWorkflow.length && tarefasWorkflow[0].vinculacaoWorkflow?.transicaoFinalWorkflow !== true && this.atividade.encerraTarefa) {
                this.form.get('especieAtividade').setValue(null);
                // caso tarefa seja de workflow verificar espécies permitidas
                this.especieAtividadePagination.filter = {
                    orX: [
                        {'transicoesWorkflow.workflow.id': 'eq:' + tarefasWorkflow[0].vinculacaoWorkflow.workflow.id},
                        {
                            'transicoesWorkflow.workflow.id': 'isNull',
                            'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefasWorkflow[0].especieTarefa.generoTarefa.nome.toUpperCase()
                        },
                    ]
                };

                this.especieAtividadePagination['context'] = {tarefaId: tarefasWorkflow[0].id};
            } else {
                if (this.tarefas[0].especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
                } else {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + this.tarefas[0].especieTarefa.generoTarefa.nome.toUpperCase()};
                }
            }
        }
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelos/modelo']).then();
    }

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/oficio']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumentoBloco(values));
    }

    doDelete(documentoId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const documento = this.documentos.find(doc => doc.id === documentoId);
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documentoId,
            operacaoId: operacaoId,
            tarefaId: documento.tarefaOrigem.id,
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
            this._store.dispatch(new AssinaturaStore.AssinaDocumento(documentosId));
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
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
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
            this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
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
                this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    onClicked(event): void {
        const documento = event.documento;

        const sidebar = 'editar/atividade';
        if (event.event.ctrlKey) {
            const extras = {
                queryParams: {
                    novaAba: true
                }
            };
            const url = this._router.createUrlTree([
                this.routerState.url.split('/documento/' + this.routerState.params.documentoHandle)[0] +
                '/documento/' + documento.id,
                {
                    outlets: {
                        sidebar: sidebar
                    }
                }
            ], extras);
            window.open(url.toString(), '_blank');
        } else {
            this._store.dispatch(new fromStore.ClickedDocumento(documento));
        }
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
        this.verificaFilterWorkflow();
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
