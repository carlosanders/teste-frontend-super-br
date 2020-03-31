import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Tarefa, PaginatedResponse} from '@cdk/models';
import {ProcessosService} from 'src/@cdk/services/processos.service';
import * as fromStore from 'app/main/apps/tarefas/store';

import {getRouterState, getScreenState} from 'app/store/reducers';

import {locale as english} from 'app/main/apps/tarefas/i18n/en';

import {Folder} from '@cdk/models';

import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../auth/login/login.service';
import {ToggleMaximizado} from 'app/main/apps/tarefas/store';
import {Topico} from 'ajuda/topico';
import {Usuario} from '@cdk/models';

import * as fromAssuntoStore from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store';
import { AssuntoService } from '@cdk/services/assunto.service';
import { Assunto } from '@cdk/models';

@Component({
    selector: 'protocolo-externo',
    templateUrl: './protocolos-externos.component.html',
    styleUrls: ['./protocolos-externos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocolosExternosComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
    currentTarefaId: number;
    tarefas: Tarefa[] = [];
    
    tarefaListSize = 35;
    tarefaListOriginalSize: number;

    tarefas$: Observable<Tarefa[]>;
    
    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedTarefas$: Observable<Tarefa[]>;

    selectedTarefas: Tarefa[] = [];

    screen$: Observable<any>;

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;

    /*
    * ISSUE-107
    */
    assuntos: Assunto[] = [];
    assuntos$: Observable<Assunto[]>;
    idTarefaToLoadAssuntos$: Observable<number>;
    idTarefaToLoadAssuntos: number;
    assuntoService: AssuntoService;
    pagAssuntos : PaginatedResponse;
    bsAssuntos: BehaviorSubject<Assunto[]> = new BehaviorSubject([]);

    assuntoLoading$: Observable<boolean>;
    assuntoPanelOpen$: Observable<boolean>;

    tarefaToLoadAssuntos$: Observable<Tarefa>;
    AjudaTarefa: Topico;
    PesquisaTarefa: string;

    @ViewChild('tarefaListElement', {read: ElementRef, static: true}) tarefaListElement: ElementRef;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _tarefaService
     * @param _router
     * @param _store
     * @param _storeAssunto
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _tarefaService: ProcessosService,
        private _router: Router,
        private _store: Store<fromStore.TarefasAppState>,
        private _loginService: LoginService,
        private _assuntoService: AssuntoService,
        /*
         * ISSUE-107 
         */
        private _storeAssutos: Store<fromAssuntoStore.AssuntoListAppState>

    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefas));
         
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedTarefas$ = this._store.pipe(select(fromStore.getSelectedTarefas));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTarefaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTarefaIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTarefaIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id};

        this.assuntoService = _assuntoService;
        /*
         * ISSUE-107 
         */
        this.assuntos = new Array();
        this.assuntoLoading$ = this._store.pipe(select(fromStore.getIsAssuntoLoading));
        this.assuntoPanelOpen$ = this._store.pipe(select(fromStore.getIsAssuntoPanelIsOpen));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntosTarefas));
        this.idTarefaToLoadAssuntos$ = this._store.pipe(select(fromStore.getIdTarefaToLoadAssuntos));
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

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.currentTarefaId = parseInt(routerState.state.params['tarefaHandle'], 0);
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefas => !!tarefas)
        ).subscribe(tarefas => {
            this.tarefas = tarefas;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => {
            this.maximizado = maximizado;
        });

        this.selectedTarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedTarefas => {
            this.selectedTarefas = selectedTarefas;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado());
                }
            } else {
                this.mobileMode = false;
            }
        });

        /*
        * ISSUE-107
        */
       this.assuntos$.pipe().subscribe(assuntos => {
            this.assuntos = assuntos;
        });

        this.idTarefaToLoadAssuntos$.subscribe(id => {
            this.idTarefaToLoadAssuntos = id;
        });
       
       
        this.PesquisaTarefa = 'tarefa';//IDEIA INICIAL AJUDA ABA TAREFAS
        

    }

    ngAfterViewInit(): void {
        this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {

        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        this._store.dispatch(new fromStore.UnloadTarefas({reset: false}));
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
        };
        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    onScroll(): void {
        if (this.tarefas.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetTarefas(nparams));
    }

    setCurrentTarefa(tarefa: Tarefa): void {
        if (!tarefa.dataHoraLeitura) {
            this._store.dispatch(new fromStore.ToggleLidaTarefa(tarefa));
        }
        this._store.dispatch(new fromStore.SetCurrentTarefa({
            tarefaId: tarefa.id,
            processoId: tarefa.processo.id,
            acessoNegado: tarefa.processo.acessoNegado
        }));
    }

    deleteTarefa(tarefaId: number): void {
        this._store.dispatch(new fromStore.DeleteTarefa(tarefaId));
    }

    doToggleUrgente(tarefa: Tarefa): void {
        this._store.dispatch(new fromStore.ToggleUrgenteTarefa(tarefa));
    }

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedTarefas(ids));
    }

    setFolderOnSelectedTarefas(folder): void {
        this.selectedTarefas.forEach((tarefa) => {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: tarefa, folder: folder}));
        });
    }

    onResizeEndTarefaList(event: ResizeEvent): void {
        const potencialTarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;

        if (potencialTarefaListSize < 30) {
            this.tarefaListSize = 30;
            setTimeout(() => {
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialTarefaListSize > 50) {
            this.tarefaListSize = 50;
            this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.tarefaListOriginalSize = this.tarefaListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.tarefaListSize = (event.rectangle.width * this.tarefaListSize) / this.tarefaListOriginalSize;
        this.tarefaListOriginalSize = event.rectangle.width;
    }

    doCreateDocumentoAvulso(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/oficio']).then();
    }

    doCreateTarefa(params): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/' + params.processoId]).then();
    }

    doMovimentar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/atividades/criar']).then();
    }

    doEditTarefa(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/editar']).then();
    }

    doCompartilhar(tarefaId): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa/' + tarefaId + '/compartilhamentos/criar']).then();
    }

    doCompartilharBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doMovimentarBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/atividade-bloco']).then();
    }

    doEditTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-bloco']).then();
    }

    doUploadBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/responder-complementar-create-bloco']).then();
    }

    doEditorBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/documento-avulso-bloco']).then();
    }

    /*
    * Função que carrega os assuntos do processo associado à tarefa
    * @tarefa
    * Recebe a referencia da tarefa carregada no componente de lista de tarefas
    */
    doLoadAssuntos(tarefa): void {

        const processo = {
            'processo.id' : 'eq:' + tarefa.processo.id
        }
        
        const sort = {
            'principal' : 'DESC',
            'criadoEm' : 'DESC'
        }

        const populate = ['populateAll'];

        const serviceParams = {
            filter: processo,
            sort : sort,
            limit : 10,
            offset : 0,
            populate : populate
        }

        const proc = {
            proc: tarefa.processo
        }

        const params = {
            proc: proc,
            srv: serviceParams,
            tarefa: tarefa.id
        }

        this._store.dispatch(new fromStore.GetAssuntosProcessoTarefa(params));
        
    }   

}
