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
import {Observable, Subject} from 'rxjs';

import {Assinatura, Atividade, Colaborador, ComponenteDigital, Documento, Pagination, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store';
import * as AssinaturaStore from 'app/store';
import {getDocumentosHasLoaded} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store';
import {LoginService} from 'app/main/auth/login/login.service';
import * as fromStoreTarefaDetail from '../../store';
import {getTarefa} from '../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Back} from 'app/store';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from 'modules/dynamic.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import {CdkUtils} from '@cdk/utils';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';

@Component({
    selector: 'atividade-create',
    templateUrl: './atividade-create.component.html',
    styleUrls: ['./atividade-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    errorEditor$: Observable<any>;
    loading$: Observable<boolean>;

    form: FormGroup;

    loadedMinutas: any;

    routerState: any;

    especieAtividadePagination: Pagination;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedIds$: Observable<number[]>;
    disabledIds: number[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    loadDocumentosExcluidos$: Observable<boolean>;
    lixeiraMinutas$: Observable<boolean>;
    undeletingDocumentosId$: Observable<number[]>;
    assinaturaErrors$: Observable<any>;
    assinaturaErrosDocumentosId$: Observable<number[]>;
    errorsAssinatura: string = null;
    saving$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    screen$: Observable<any>;

    mobileMode = false;
    mode: string;

    formEditor: FormGroup;

    modeloPagination: Pagination;

    routeAtividadeDocumento = 'atividade';

    mensagemErro = null;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;

    formEditorValid = false;

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
     * @param _snackBar
     */
    constructor(
        private _store: Store<fromStore.AtividadeCreateAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
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
        this.tarefa$ = this._store.pipe(select(getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        this.errorEditor$ = this._store.pipe(select(fromStore.getComponentesDigitaisErrors));
        this.saving$ = this._store.pipe(select(fromStore.getIsSavingDocumentos));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoadingDocumentos));

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));

        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.assinaturaErrors$ = this._store.pipe(select(AssinaturaStore.getAssinaturaErrors));
        this.assinaturaErrosDocumentosId$ = this._store.pipe(select(AssinaturaStore.getAssinaturaErrosDocumentosId));

        this.loadDocumentosExcluidos$ = this._store.pipe(select(fromStore.getDocumentosExcluidos));
        this.lixeiraMinutas$ = this._store.pipe(select(fromStore.getLixeiraMinutas));
        this.undeletingDocumentosId$ = this._store.pipe(select(fromStore.getUnDeletingDocumentosId));
        this.screen$ = this._store.pipe(select(getScreenState));

        this._store.pipe(
            select(getDocumentosHasLoaded),
            takeUntil(this._unsubscribeAll)
        ).subscribe(loaded => this.loadedMinutas = loaded);

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];

        this.formEditor = this._formBuilder.group({
            modelo: [null]
        });

        this.formEditor.get('modelo').valueChanges.subscribe((value) => {
            this.formEditorValid = value && typeof value === 'object';
        });

        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = [
            'documento',
            'documento.componentesDigitais'
        ];
        this.modeloPagination.filter = {
            orX: [
                {
                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                },
                {
                    // Modelos individuais
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                },
            ]
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
            filter(tarefa => !!tarefa)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
            this.atividade.tarefa = tarefa;
            this.atividade.usuario = tarefa.usuarioResponsavel;
            this.atividade.setor = tarefa.setorResponsavel;

            if (tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
            }

            this.verificaFilterWorkflow();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription) {
                this.sheetRef.dismiss();
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentos) => {
            this.minutas = documentos.filter(documento =>
                (!documento.documentoAvulsoRemessa && documento.minuta && !documento.apagadoEm));

            this.changedSelectedIds(this.minutas.map(minuta => minuta.id));

            if (this.atividade.encerraTarefa) {
                this.disabledIds = this.minutas.map(minuta => minuta.id);
            }
            this._changeDetectorRef.markForCheck();

            this.lixeiraMinutas$.subscribe((lixeira) => {
                if (lixeira) {
                    this.minutas = documentos.filter(documento => (documento.apagadoEm));
                    this.changedSelectedIds([]);
                    this.disabledIds = [];
                    this._changeDetectorRef.markForCheck();
                }
            });
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
            this.mode = this.mobileMode ? 'vertical' : 'horizontal';
        });

        this.assinaturaErrors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((err) => {
            if (err) {
                this.errorsAssinatura = CdkUtils.errorsToString(err);
            } else {
                this.errorsAssinatura = null;
            }
        })
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
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

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        if (atividade.encerraTarefa) {
            atividade.documentos = this.minutas;
        } else {
            atividade.documentos = this.selectedMinutas;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAtividade({
            atividade: atividade,
            operacaoId: operacaoId
        }));
    }

    checkModelo(): void {
        const value = this.formEditor.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.formEditor.get('modelo').setValue(null);
        }
    }

    erroUpload(mensagemErro): void {
        this.mensagemErro = mensagemErro;
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    doEditor(): void {
        const modelo = this.formEditor.get('modelo').value;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefa,
            routeAtividadeDocumento: this.routeAtividadeDocumento,
            operacaoId: operacaoId
        }));
        this.formEditor.get('modelo').setValue(null);
        this.menuTriggerList.closeMenu();
    }

    goToModelo(): void {
        this.formEditor.get('modelo').setValue(null);
        this.menuTriggerList.closeMenu();
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelos/modelo']).then();
    }

    doVisualizarModelo(): void {
        this._store.dispatch(new fromStore.VisualizarModelo(this.formEditor.get('modelo').value.documento.componentesDigitais[0].id));
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDeleteBloco(documentosId: number[]): void {
        this.lote = CdkUtils.makeId();
        documentosId.forEach((documentoId: number) => this.doDelete(documentoId, this.lote));
    }

    doDelete(documentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = documentoId;
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documento.id,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteDocumento({
                    documentoId: documento.id,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteDocumentoFlush()
            ],
            undo: new fromStore.UndeleteDocumento({
                documento: documento,
                operacaoId: operacaoId,
                loaded: this.loadedMinutas,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletada(s)'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteDocumentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteDocumentoFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscription = null;
        });
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
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
            result.documentos.forEach((documento) => {
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
            result.documento.componentesDigitais.forEach((componenteDigital) => {
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

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    onClicked(event): void {
        const documento = event.documento;
        const sidebar = 'editar/' + this.routeAtividadeDocumento;
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

    onComplete(): void {
        this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
    }

    onCompleteAll(): void {
        this._store.dispatch(new fromStoreTarefaDetail.GetTarefa({
            id: this.routerState.params['tarefaHandle']
        }));
        this._store.dispatch(new fromStore.GetDocumentos());
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

    doRestaurar(documentoId): void {
        const operacaoId = CdkUtils.makeId();
        const documento = new Documento();
        documento.id = documentoId;
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

    minutasExcluidas(): void {
        this.minutas = [];
        const params = {
            filter: {'tarefaOrigem.id': 'eq:' + this.tarefa.id, 'juntadaAtual': 'isNull'},
            sort: {id: 'DESC'},
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

    verificaFilterWorkflow(): void {
        // caso tarefa seja de workflow verificar espécies permitidas
        this.especieAtividadePagination['context'] = {};
        if (this.tarefa?.vinculacaoWorkflow && this.tarefa.vinculacaoWorkflow.transicaoFinalWorkflow !== true && this.form.get('encerraTarefa').value) {
            this.form.get('especieAtividade').setValue(null);
            this.especieAtividadePagination.filter = {
                orX: [
                    {'transicoesWorkflow.workflow.id': 'eq:' + this.tarefa.vinculacaoWorkflow.workflow.id},
                    {
                        'transicoesWorkflow.workflow.id': 'isNull',
                        'generoAtividade.nome': 'in:ADMINISTRATIVO,' + this.tarefa.especieTarefa.generoTarefa.nome.toUpperCase()
                    },

                ]
            };

            this.especieAtividadePagination['context'] = {tarefaId: this.tarefa.id};

        } else {
            if (this.tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + this.tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
            }
        }
    }
}
