import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {
    Acao,
    Assinatura,
    ComponenteDigital,
    Documento,
    Etiqueta,
    Pagination,
    Tarefa,
    Usuario,
    VinculacaoEtiqueta
} from '@cdk/models';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getMaximizado, ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from 'modules/dynamic.service';
import {CdkUtils} from '@cdk/utils';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarRef,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {
    CdkTarefaListService,
} from '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material/menu';
import * as AssinaturaStore from 'app/store';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {MatDialog} from '@angular/material/dialog';
import {
    CdkUploadDialogComponent
} from '@cdk/components/documento/cdk-upload-dialog/cdk-upload-dialog.component';
import {
    CdkVinculacaoEtiquetaAcoesDialogComponent
} from '@cdk/components/vinculacao-etiqueta/cdk-vinculacao-etiqueta-acoes-dialog/cdk-vinculacao-etiqueta-acoes-dialog.component';

@Component({
    selector: 'tarefa-detail',
    templateUrl: './tarefa-detail.component.html',
    styleUrls: ['./tarefa-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaDetailComponent implements OnInit, OnDestroy {

    @ViewChild('cdkUpload', {static: false}) cdkUpload;

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    @ViewChild('menuTriggerMinutas') menuTriggerMinutas: MatMenuTrigger;

    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;
    errorsAddEtiqueta$: Observable<any>;
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];
    vinculacoesEtiquetasMinutas: VinculacaoEtiqueta[] = [];
    vinculacaoEtiquetaPagination: Pagination;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    showEtiqueta: boolean = false;
    habilitarOpcaoBtnAddEtiqueta: boolean = true;
    placeholderEtiq = 'Adicionar etiquetas na tarefa';
    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    expandir$: Observable<boolean>;
    screen$: Observable<any>;
    routerState: any;
    maximizado$: Observable<boolean>;
    maximizado: boolean = false;
    mobileMode: boolean = false;
    routeAtividade: string = 'atividades/criar';
    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    novaAba = false;
    showDetail: boolean = false;
    isGridMode: boolean = false;
    typeHandle: string;
    formTipoDocumento: FormGroup;
    tipoDocumentoPagination: Pagination = new Pagination();

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    habilitarTipoDocumentoSalvar: boolean = false;
    savingComponentesDigitais: boolean = false;

    deletingDocumentosId: number[] = [];
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId: number[] = [];
    downloadP7SDocumentoIds: number[] = [];
    removendoAssinaturaDocumentosId: number[] = [];
    alterandoDocumentosId: number[] = [];

    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentoIds$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    errorComponentesDigitais$: Observable<any>;

    isSaving$: Observable<boolean>;
    isLoadingDocumentosVinculados$: Observable<boolean>;
    documentosVinculados$: Observable<Documento[]>;
    documentosVinculados: Documento[];
    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosVinculadosId$: Observable<number[]>;
    documentosVinculadosPagination$: Observable<any>;
    documentosVinculadosPagination: any;
    isLoadingAcoesEtiqueta$: Observable<boolean>;
    acoesEtiquetaList$: Observable<Acao[]>;

    routeAtividadeDocumento = 'atividade';
    routeOficioDocumento = 'oficio';

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;
    private _currentVinculacaoEtiqueta: VinculacaoEtiqueta = null;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TarefaDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _snackBar: MatSnackBar,
        private _cdkTarefaListService: CdkTarefaListService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _viewContainerRef: ViewContainerRef
    ) {

        this.formTipoDocumento = this._formBuilder.group({
            tipoDocumentoMinutas: [null]
        });

        this._profile = _loginService.getUserProfile();
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.expandir$ = this._store.pipe(select(fromStore.expandirTela));
        this.etiqueta$ = this._store.pipe(select(fromStore.getEtiqueta));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:TAREFA'
                }
            ]
        };

        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errorsAddEtiqueta$ = this._store.pipe(select(fromStore.getEtiquetaError));
        this._cdkTarefaListService
            .viewModeObservable()
            .pipe(
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((viewMode) => this.isGridMode = viewMode === 'grid');

        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.downloadP7SDocumentoIds$ = this._store.pipe(select(fromStore.getDownloadDocumentoP7SId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.errorComponentesDigitais$ = this._store.pipe(select(fromStore.getErrorsComponentesDigitais));
        this.isLoadingAcoesEtiqueta$ = this._store.pipe(select(fromStore.getAcoesEtiquetaIsLoading));
        this.acoesEtiquetaList$ = this._store.pipe(select(fromStore.getAcoesEtiqueta));

        this._store.pipe(select(fromStore.getShowDetail))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((showDetail: boolean) => this.showDetail = showDetail);
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription && this.routerState?.url.indexOf('operacoes-bloco') === -1) {
                this.sheetRef.dismiss();
            }

            if (routerState.state.queryParams['novaAba']) {
                this.novaAba = true;
                this.doToggleMaximizado(this.novaAba);
            }
            this.routerState = routerState.state;
            this.typeHandle = routerState['typeHandle'];
        });

        this.tarefa$.pipe(
            filter(tarefa => !!tarefa),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
            this._updateTarefaVinculacoesEtiquetas();
        });
        this.expandir$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (expandir) => {
                if (expandir || !this.novaAba) {
                    this.doToggleMaximizado(expandir);
                }
            }
        );

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (maximizado) => {
                this.maximizado = maximizado;

                if (maximizado && this.showDetail) {
                    this.doToggleShowDetail();
                }
            }
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            if (!this.mobileMode && screen.size !== 'desktop') {
                this.doToggleShowDetail();
            }

            this.mobileMode = screen.size !== 'desktop';
        });

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSavingDocumentosVinculados));
        this.isLoadingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsLoadingDocumentosVinculados));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.alterandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosVinculadosId));
        this.documentosVinculadosPagination$ = this._store.pipe(select(fromStore.getDocumentosVinculadosPagination));

        this.errors$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        });

        this.errorComponentesDigitais$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        });

        this.deletingDocumentosId$
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this._updateTarefaVinculacoesEtiquetas()
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadTarefaDetail());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    private _updateTarefaVinculacoesEtiquetas(): void {
        this.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas ? this.tarefa.vinculacoesEtiquetas.filter(
            vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass !== 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        ) : [];

        this.vinculacoesEtiquetasMinutas = this.tarefa.vinculacoesEtiquetas ? this.tarefa.vinculacoesEtiquetas.filter(
            // eslint-disable-next-line max-len
            vinculacaoEtiqueta => vinculacaoEtiqueta?.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        ) : [];
        this.vinculacoesEtiquetasMinutas.sort((a: VinculacaoEtiqueta, b: VinculacaoEtiqueta) => a.id - b.id);

        this._changeDetectorRef.markForCheck();
    }

    onVinculacaoEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            tarefa: this.tarefa,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onVinculacaoEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onVinculacaoEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta({
            tarefaId: this.tarefa.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEtiqueta({
            etiqueta: etiqueta,
            tarefa: this.tarefa,
            operacaoId: operacaoId
        }));
        this.etiqueta = null;
        this.showEtiqueta = false;
    }

    abreEditor(documentoId: number, tarefa: Tarefa, outraAba?: boolean): void {
        let stepHandle = 'latest';
        let urlEditor;
        if (this.routerState.params['processoHandle'] && parseInt(this.routerState.params['processoHandle'], 10) === tarefa.processo.id) {
            if (this.routerState.params['stepHandle']) {
                stepHandle = this.routerState.params['stepHandle'];
            }
            urlEditor = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/processo/' + tarefa.processo.id + '/visualizar/'
                + stepHandle + '/documento/' + documentoId;
        } else {
            urlEditor = 'apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
                + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/documento/' + documentoId;
        }
        if (outraAba) {
            const extras = {
                queryParams: {
                    novaAba: true
                }
            };
            const url = this._router.createUrlTree([urlEditor], extras);
            window.open(url.toString(), '_blank');
        } else{
            this._router.navigate([urlEditor]).then();
        }
    }

    abreEditorOutraAba(documentoId: number, tarefa: Tarefa): void {
        let stepHandle = 'latest';
        if (this.routerState.params['stepHandle'] && parseInt(this.routerState.params['processoHandle'], 10) === tarefa.processo.id) {
            stepHandle = this.routerState.params['stepHandle'];
        }
        window.open(
            this.routerState.url.split('/')[1] + '/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/'
            + this.routerState.params.targetHandle + '/tarefa/' + tarefa.id + '/processo/' + tarefa.processo.id + '/visualizar/'
            + stepHandle + '/documento/' + documentoId
        );
    }

    doClickEtiqueta(vinculacaoEtiqueta: VinculacaoEtiqueta, tarefa: Tarefa, event: any): void {
        if (!tarefa.apagadoEm && vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento') {
            this.abreEditor(vinculacaoEtiqueta.objectId, tarefa, event.ctrlKey);
        }
    }

    doUploadAnexos(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.menuTriggerMinutas.closeMenu();
        this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
                const documentoId = vinculacaoEtiqueta.objectId;
                const documentoHandle = `eq:${documentoId}`;

                const params = {
                    filter: {
                        'vinculacaoDocumentoPrincipal.documento.id': documentoHandle,
                        'juntadaAtual': 'isNull'
                    },
                    limit: 10,
                    offset: 0,
                    sort: {id: 'DESC'},
                    populate: [
                        'tipoDocumento',
                        'componentesDigitais',
                        'processoOrigem',
                    ],
                    context: {'incluiVinculacaoDocumentoPrincipal': true}
                };
                this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: params, documentoId: documentoId}));
                const documento = new Documento();
                documento.id = documentoId;
                documento.minuta = true;
                documento.tarefaOrigem = this.tarefa;
                const dialogRef = this._matDialog.open(CdkUploadDialogComponent, {
                    width: '600px',
                    data: {
                        documento: documento,
                        saving$: this.isSaving$,
                        isLoading$: this.isLoadingDocumentosVinculados$,
                        documentosVinculados$: this.documentosVinculados$,
                        selectedDocumentosVinculados$: this.selectedDocumentosVinculados$,
                        deletingDocumentosVinculadosId$: this.deletingDocumentosVinculadosId$,
                        assinandoDocumentosVinculadosId$: this.assinandoDocumentosId$,
                        removendoAssinaturaDocumentosVinculadosId$: this.removendoAssinaturaDocumentosId$,
                        alterandoDocumentosId$: this.alterandoDocumentosVinculadosId$,
                        downloadP7SDocumentosId$: this.downloadP7SDocumentoIds$,
                        documentosPagination$: this.documentosVinculadosPagination$
                    }
                });
                // Subscribe nos eventos do componente
                const alteraTipoSub = dialogRef.componentInstance.alteraTipoDocumento.subscribe((values) => {
                    this._store.dispatch(new fromStore.UpdateDocumento(values));
                });
                const aprovaSub = dialogRef.componentInstance.aprovarDocumento.subscribe((aDocumento: Documento) => {
                    this._store.dispatch(new fromStore.AprovarDocumento({
                        documento: aDocumento,
                        routeDocumento: this.routeAtividadeDocumento
                    }));
                    this._matDialog.closeAll();
                });
                const atualizaSub = dialogRef.componentInstance.atualizaDocumentosVinculados.subscribe(() => {
                });
                const assinaBlocoSub = dialogRef.componentInstance.assinaBloco.subscribe((result) => {
                    if (result.certificadoDigital) {
                        const documentosId = [];
                        result.documentos.forEach((aDocumento) => {
                            documentosId.push(aDocumento.id);
                        });
                        this._store.dispatch(new AssinaturaStore.AssinaDocumento(documentosId));
                    } else {
                        const loteId = CdkUtils.makeId();
                        result.documentos.forEach((aDocumento) => {
                            aDocumento.componentesDigitais.forEach((componenteDigital) => {
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
                                    documento: aDocumento,
                                    operacaoId: operacaoId,
                                    loteId: loteId
                                }));
                            });
                        });
                    }
                });
                const assinaSub = dialogRef.componentInstance.assina.subscribe((result) => {
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
                });
                const changeSelectedSub = dialogRef.componentInstance.changeSelected.subscribe((selectedIds) => {
                    this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
                });
                const clickedSub = dialogRef.componentInstance.clickDocumento.subscribe((clickEvent) => {
                    this.abreEditor(clickEvent.documento.id, clickEvent.documentoPrincipal.tarefaOrigem);
                    dialogRef.close();
                });
                const completeSub = dialogRef.componentInstance.completeDocumentoVinculado.subscribe((result) => {
                    delete result.componenteDigital.documentoOrigem;
                    this._store.dispatch(new fromStore.CompleteDocumentoVinculado({
                        documentoPrincipalId: result.documentoPrincipal.id,
                        componenteDigital: result.componenteDigital
                    }));
                });
                const deleteSub = dialogRef.componentInstance.deleteDocumento.subscribe((result) => {
                    this.doDeleteDocumentoVinculado(result.documentoId, documentoId, result.loteId);
                });
                const downloadP7SSub = dialogRef.componentInstance.downloadP7S.subscribe((aDocumento: Documento) => {
                    aDocumento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
                        this._store.dispatch(new fromStore.DownloadToP7S(componenteDigital));
                    });
                });
                const getMoreSub = dialogRef.componentInstance.getMore.subscribe(() => {
                    if (this.documentosVinculados.length >= this.documentosVinculadosPagination.total) {
                        return;
                    }

                    const nparams = {
                        ...this.documentosVinculadosPagination,
                        offset: this.documentosVinculadosPagination.offset + this.documentosVinculadosPagination.limit
                    };

                    this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: nparams, documentoId: documentoId}));
                });
                const removeAssinaturaSub = dialogRef.componentInstance.removeAssinatura.subscribe((docId: number) => {
                    this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(docId));
                });
                // Unsubscribe em todas as assinaturas de eventos
                dialogRef.afterClosed().subscribe(() => {
                    alteraTipoSub.unsubscribe();
                    aprovaSub.unsubscribe();
                    atualizaSub.unsubscribe();
                    assinaBlocoSub.unsubscribe();
                    assinaSub.unsubscribe();
                    changeSelectedSub.unsubscribe();
                    clickedSub.unsubscribe();
                    completeSub.unsubscribe();
                    deleteSub.unsubscribe();
                    downloadP7SSub.unsubscribe();
                    getMoreSub.unsubscribe();
                    removeAssinaturaSub.unsubscribe();
                    this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
                });
    }

    doDeleteDocumentoVinculado(documentoId: number, documentoPrincipalId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoId: documentoId,
            documentoPrincipalId: documentoPrincipalId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteDocumento(documentoId: number, tarefaId: number, documentoAvulsoUuid: string = null): void {
        this.menuTriggerMinutas.closeMenu();
        const operacaoId = CdkUtils.makeId();
                const documento = new Documento();
                documento.id = documentoId;
                this._store.dispatch(new fromStore.DeleteDocumento({
                    documentoId: documento.id,
                    documentoAvulsoUuid: documentoAvulsoUuid,
                    operacaoId: operacaoId,
                    tarefaId: tarefaId,
                    loteId: null,
                    redo: [
                        new fromStore.DeleteDocumento({
                            documentoId: documento.id,
                            documentoAvulsoUuid: documentoAvulsoUuid,
                            operacaoId: operacaoId,
                            tarefaId: tarefaId,
                            loteId: null,
                            redo: 'inherent',
                            undo: 'inherent'
                            // redo e undo são herdados da ação original
                        }),
                        new fromStore.DeleteDocumentoFlush()
                    ],
                    undo: new fromStore.UndeleteDocumento({
                        documento: documento,
                        documentoAvulsoUuid: documentoAvulsoUuid,
                        operacaoId: operacaoId,
                        tarefaId: tarefaId,
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
                        text: 'Deletado(s)'
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

    doAssinaDocumento(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.menuTriggerMinutas.closeMenu();
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
                    width: '600px'
                });

                dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
                    if (result.certificadoDigital) {
                        this._store.dispatch(new AssinaturaStore.AssinaDocumento([vinculacaoEtiqueta.objectId]));
                    } else {
                        vinculacaoEtiqueta.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId: number) => {
                            const documento = new Documento();
                            documento.id = vinculacaoEtiqueta.objectId;
                            const assinatura = new Assinatura();
                            const componenteDigital = new ComponenteDigital();
                            componenteDigital.id = componenteDigitalId;
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
                                operacaoId: operacaoId
                            }));
                        });
                        vinculacaoEtiqueta.objectContext['componentesDigitaisVinculadosId']?.forEach((componenteDigitalId: number) => {
                            const documento = new Documento();
                            documento.id = vinculacaoEtiqueta.objectId;
                            const assinatura = new Assinatura();
                            const componenteDigital = new ComponenteDigital();
                            componenteDigital.id = componenteDigitalId;
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
                                operacaoId: operacaoId
                            }));
                        });
                    }
                });
    }

    doRemoveAssinaturaDocumento(documentoId: number): void {
        this.menuTriggerMinutas.closeMenu();
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doAbrirMinutaEmOutraAba(vinculacaoEtiqueta: VinculacaoEtiqueta, tarefa: Tarefa): void {
        this.menuTriggerMinutas.closeMenu();
        if (!tarefa.apagadoEm && vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento') {
            this.abreEditorOutraAba(vinculacaoEtiqueta.objectId, tarefa);
        }
    }

    doConvertePdf(documentoId: number): void {
        this.menuTriggerMinutas.closeMenu();
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId: number): void {
        this.menuTriggerMinutas.closeMenu();
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doDownloadP7S(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.menuTriggerMinutas.closeMenu();
        vinculacaoEtiqueta.objectContext['componentesDigitaisId']?.forEach((componenteDigitalId: number) => {
            this._store.dispatch(new fromStore.DownloadToP7S(componenteDigitalId));
        });
    }

    doVerResposta(documentoRespostaId: number, tarefa: Tarefa): void {
        this.menuTriggerMinutas.closeMenu();
        this.abreEditor(documentoRespostaId, tarefa);
    }

    doAprovaDocumento(documentoId: number): void {
        this.menuTriggerMinutas.closeMenu();
        const documento = new Documento();
                documento.id = documentoId;
                this._store.dispatch(new fromStore.AprovarDocumento({
                    documento: documento,
                    routeDocumento: this.routeAtividadeDocumento
                }));
    }

    checkTipoDocumento(): void {
        const value = this.formTipoDocumento.get('tipoDocumentoMinutas').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.formTipoDocumento.get('tipoDocumentoMinutas').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
        this._changeDetectorRef.detectChanges();
    }

    salvarTipoDocumento(): void {
        const tipoDocumento = this.formTipoDocumento.get('tipoDocumentoMinutas').value;
        this.menuTrigger?.closeMenu();
        this.formTipoDocumento.get('tipoDocumentoMinutas').setValue(null);
        const documento = new Documento();
        documento.id = this._currentVinculacaoEtiqueta.objectId;
        this.menuTriggerMinutas.closeMenu();
        this._store.dispatch(new fromStore.UpdateDocumento({documento: documento, tipoDocumento: tipoDocumento}));
    }

    onComplete(componenteDigital: ComponenteDigital): void {
    }

    onCompleteAll(): void {
        this._store.dispatch(new fromStore.UploadConcluido(this.tarefa.id));
    }

    onErroUpload(mensagem: string): void {
    }

    setCurrentVinculacaoEtiqueta(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._currentVinculacaoEtiqueta = vinculacaoEtiqueta;
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }

    doToggleShowDetail(): void {
        this._store.dispatch(new fromStore.ToggleShowDetail(!this.showDetail));
    }

    onPendencies(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.GetAcoesEtiqueta(vinculacaoEtiqueta.etiqueta.id));
        const dialogRef = this._matDialog
            .open(CdkVinculacaoEtiquetaAcoesDialogComponent, {
                data: {
                    vinculacaoEtiqueta: vinculacaoEtiqueta,
                    acoesEtiquetaList$: this.acoesEtiquetaList$,
                    isSaving$: this.isSaving$,
                    isLoading$: this.isLoadingAcoesEtiqueta$
                },
                width: '600px',
                height: '600px',
            });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acoesId?: number[]) => {
                if (acoesId) {
                    this._store.dispatch(new fromStore.AprovarSugestao({
                        vinculacaoEtiqueta: vinculacaoEtiqueta,
                        acoesExecucaoSugestao: JSON.stringify(acoesId),
                        tarefa: this.tarefa
                    }));
                }
            });
    }

    vinculacaoEtiquetaTrackBy(index, vinculacaoEtiqueta: VinculacaoEtiqueta): number {
        return vinculacaoEtiqueta.id;
    }
}
