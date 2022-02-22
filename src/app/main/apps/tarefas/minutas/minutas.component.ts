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

import {Assinatura, Colaborador, ComponenteDigital, Documento, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as AssinaturaStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {getOperacoes, getRouterState} from 'app/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Back} from '../../../../store';
import {getSelectedTarefas} from '../store';
import {CdkUtils} from '@cdk/utils';
import {MatMenuTrigger} from '@angular/material/menu';
import {DynamicService} from 'modules/dynamic.service';
import {AgrupadorTarefa} from './store';

@Component({
    selector: 'minutas',
    templateUrl: './minutas.component.html',
    styleUrls: ['./minutas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MinutasComponent implements OnInit, OnDestroy {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[] = [];

    operacoes: any[] = [];
    tarefasAgrupadas: {
        [id: number]: AgrupadorTarefa;
    } = {};
    processos: {
        [id: number]: {
            nupFormatado: string;
            tarefas: number[];
        };
    } = {};
    documentos: {
        [id: number]: Documento[];
    } = {};

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    routerState: any;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedOficios: Documento[] = [];
    selectedIds$: Observable<number[]>;
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    lixeiraMinutas$: Observable<boolean>;
    undeletingDocumentosId$: Observable<number[]>;
    isLoadingAny$: Observable<boolean>;

    lote: string;
    lixeira: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Colaborador;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param _dynamicService
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.MinutasAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            // this.operacoes = Object.values(operacoes).filter(operacao => operacao.type === 'minutas' && operacao.lote === this.loteAtividades);
            this._changeDetectorRef.markForCheck();
        });

        this._profile = _loginService.getUserProfile().colaborador;

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.undeletingDocumentosId$ = this._store.pipe(select(fromStore.getUndeletingDocumentosId));
        this.isLoadingAny$ = this._store.pipe(select(fromStore.isLoadingAny));
        this.lixeiraMinutas$ = this._store.pipe(select(fromStore.getLixeiraMinutas));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.operacoes = [];

        this.lixeiraMinutas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(lixeira => this.lixeira = lixeira);

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(fromStore.getTarefas),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefasAgrupadas = {
                ...tarefas
            };
            Object.keys(tarefas).forEach((tarefa) => {
                const tarefasPorProcesso = this.processos[this.tarefasAgrupadas[tarefa].processoId]?.tarefas ?? [];
                if (tarefasPorProcesso.indexOf(this.tarefasAgrupadas[tarefa].id) === -1) {
                    tarefasPorProcesso.push(this.tarefasAgrupadas[tarefa].id);
                }
                this.processos = {
                    ...this.processos,
                    [this.tarefasAgrupadas[tarefa].processoId]: {
                        nupFormatado: this.tarefasAgrupadas[tarefa].nupFormatado,
                        tarefas: tarefasPorProcesso
                    }
                };
            });
            this._changeDetectorRef.markForCheck();
        });

        this.tarefas$.pipe(
            distinctUntilChanged(),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
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
            const novoDocumentos = {};
            this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa && !documento.juntadaAtual));
            Object.keys(this.tarefasAgrupadas).forEach((tarefa) => {
                if (this.tarefasAgrupadas[tarefa]?.documentosId?.length) {
                    const documentosTarefa = this.minutas.filter(documento => documento.tarefaOrigem.id === parseInt(tarefa, 10));
                    novoDocumentos[tarefa] = documentosTarefa;
                } else {
                    novoDocumentos[tarefa] = [];
                }
            });
            Object.keys(novoDocumentos).forEach((tarefaId) => {
                this.documentos = {
                    ...this.documentos,
                    [tarefaId]: novoDocumentos[tarefaId]
                };
            });
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._store.dispatch(new fromStore.UnloadDocumentos());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    upload(): void {
        this.cdkUpload.upload();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/minutas')[0] + '/modelo']).then();
    }

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/minutas')[0] + '/oficio']).then();
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

    doDelete(documento: Documento, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documento.id,
            tarefaId: documento.tarefaOrigem.id,
            uuid: documento.uuid,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteBloco(documentos: Documento[]): void {
        this.lote = CdkUtils.makeId();
        documentos.forEach((documento: Documento) => this.doDelete(documento, this.lote));
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

    onClicked(documento): void {
        let sidebar = 'oficio/dados-basicos';
        if (!documento.documentoAvulsoRemessa) {
            sidebar = 'editar/dados-basicos';
        }
        if (documento.apagadoEm) {
            sidebar = 'editar/restaurar';
        }
        this._router.navigate([this.routerState.url + '/documento/' + documento.id, {
                outlets: {
                    sidebar: sidebar
                }
            }],
            {
                relativeTo: this._activatedRoute.parent,
                queryParams: {lixeira: documento.apagadoEm ? true : null}
            }).then();
    }

    paginaDocumentos(tarefaId: number): void {
        const pagination = this.tarefasAgrupadas[tarefaId].pagination;
        const documentosId = this.tarefasAgrupadas[tarefaId].documentosId;
        if (documentosId.length >= pagination.total) {
            return;
        }
        if (!this.tarefasAgrupadas[tarefaId].loading) {
            const nparams = {
                ...pagination,
                offset: pagination.offset + pagination.limit,
                tarefaId: tarefaId,
                processoId: this.tarefasAgrupadas[tarefaId].processoId,
                nupFormatado: this.tarefasAgrupadas[tarefaId].nupFormatado
            };
            this._store.dispatch(new fromStore.GetDocumentos(nparams));
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

    doRestaurar(documento: Documento): void {
        const operacaoId = CdkUtils.makeId();
        const populate = [
            'tipoDocumento',
            'tarefaOrigem',
            'tarefaOrigem.vinculacoesEtiquetas',
            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
            'componentesDigitais'
        ];
        this._store.dispatch(new fromStore.UndeleteDocumento({
            documento: documento,
            tarefaId: documento.tarefaOrigem.id,
            populate: populate,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

    doToggleLixeiraMinutas(status): void {
        this.minutas = [];
        const tarefas = this.tarefas;
        this._store.dispatch(new fromStore.UnloadDocumentos());
        tarefas.sort((a, b) => a.processo.id < b.processo.id ? -1 : a.processo.id > b.processo.id ? 1 : 0);
        if (!status) {
            // Saindo da lixeira de minutas
            tarefas.forEach((tarefa) => {
                this.documentos = {
                    ...this.documentos,
                    [tarefa.id]: []
                };
                const tarefaHandle = `eq:${tarefa.id}`;
                const params = {
                    filter: {
                        'tarefaOrigem.id': tarefaHandle,
                        'documentoAvulsoRemessa.id': 'isNull',
                        'juntadaAtual': 'isNull'
                    },
                    limit: 10,
                    offset: 0,
                    sort: {
                        criadoEm: 'DESC'
                    },
                    populate: [
                        'tipoDocumento',
                        'tarefaOrigem',
                        'tarefaOrigem.vinculacoesEtiquetas',
                        'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                        'componentesDigitais'
                    ],
                    tarefaId: tarefa.id,
                    processoId: tarefa.processo.id,
                    nupFormatado: tarefa.processo.NUPFormatado
                };
                this._store.dispatch(new fromStore.GetDocumentos(params));
            });
        } else {
            // Entrando na lixeira de minutas
            tarefas.forEach((tarefa) => {
                this.documentos = {
                    ...this.documentos,
                    [tarefa.id]: []
                };
                const tarefaHandle = `eq:${tarefa.id}`;
                const params = {
                    filter: {
                        'tarefaOrigem.id': tarefaHandle,
                        'documentoAvulsoRemessa.id': 'isNull',
                        'juntadaAtual': 'isNull',
                        'apagadoEm': 'isNotNull'
                    },
                    limit: 10,
                    offset: 0,
                    sort: {
                        criadoEm: 'DESC'
                    },
                    populate: [
                        'tipoDocumento',
                        'tarefaOrigem',
                        'componentesDigitais'
                    ],
                    context: {
                        'mostrarApagadas': true
                    },
                    tarefaId: tarefa.id,
                    processoId: tarefa.processo.id,
                    nupFormatado: tarefa.processo.NUPFormatado
                };
                this._store.dispatch(new fromStore.GetDocumentos(params));
            });
        }
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos([]));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
