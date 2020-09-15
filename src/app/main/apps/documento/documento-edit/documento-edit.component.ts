import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {Documento, Etiqueta, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {Tarefa} from '@cdk/models';
import {getTarefa} from '../../tarefas/tarefa-detail/store/selectors';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {Assinatura} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {DocumentoEditService} from './shared/documento-edit.service';

@Component({
    selector: 'documento-edit',
    templateUrl: './documento-edit.component.html',
    styleUrls: ['./documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;
    pagination$: Observable<any>;
    pagination: any;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    documentoPrincipal: Documento;

    documento: Documento;

    activeCard: string;

    @ViewChild('dynamicForm', {read: ViewContainerRef}) containerForm: ViewContainerRef;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    routerState: any;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Usuario;

    juntadaRoute = false;

    vinculacaoEtiquetaPagination: Pagination;
    savingVinculacaoEtiquetaId$: Observable<any>;
    vinculacaoEtiquetaErrors$: Observable<any>;

    logEntryPagination: Pagination;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _sanitizer
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     * @param _documentoEditService
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _documentoEditService: DocumentoEditService,
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.tarefa$ = this._store.pipe(select(getTarefa));
        }

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};

        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
        };
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.vinculacaoEtiquetaErrors$ = this._store.pipe(select(fromStore.getVinculacaoEtiquetaErrors));

        this.logEntryPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.tarefa$.subscribe(tarefa => {
                this.tarefa = tarefa;
            });
        }

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;

                this.activeCard = this.routerState.params['sidebarHandle'];
                this._ref.detectChanges();
            }
        });

        this.documento$.pipe(
            filter(documento => !this.documento || (documento && (documento.id !== this.documento.id)))
        ).subscribe(documento => {
            this.documento = documento;
            if (documento && documento.vinculacaoDocumentoPrincipal) {
                this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
                if (this.routerState.params['sidebarHandle'] !== 'dados-basicos') {
                    this.showForm();
                }
            }
        });

        this.pagination$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {

                this.pagination = pagination;

            } else {
                this.pagination = pagination;
            }
        });

        // this._documentoEditService.activeCard.subscribe(activeCard => this.activeCard = activeCard);
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });

        const path1 = 'app/main/apps/documento/documento-edit#form';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
                            this.containerForm.createComponent(componentFactory);
                            this._ref.markForCheck();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    anexarCopia(): void {
        this._router.navigate([
                this.routerState.url.split(this.routerState.params.documentoHandle + '/editar')[0] +
                this.routerState.params.documentoHandle + '/editar/anexar-copia/' + this.documento.processoOrigem.id + '/visualizar'
            ]
        ).then();
    }

    aprovar(): void {
        this._store.dispatch(new fromStore.ApproveComponenteDigital({
            documentoOrigem: this.documento
        }));

    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado(documentoId));
    }

    doAssinaturaDocumentoVinculado(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumentoVinculado(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';

                this._store.dispatch(new fromStore.AssinaDocumentoVinculadoEletronicamente({assinatura: assinatura, password: result.password}));
            });
        }
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    back(): void {
        this._location.back();
    }

    showAtividade(): void {
        if (this.activeCard !== 'atividade') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'atividade')])
                .then();
        }
        // this._documentoEditService.doChangeCard('atividade');
    }

    showAnexos(): void {
        if (this.activeCard !== 'anexos') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'anexos')])
                .then();
        }
        // this._documentoEditService.doChangeCard('anexos');
    }

    showInteligencia(): void {
        if (this.activeCard !== 'inteligencia') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'inteligencia')])
                .then();
        }
        // this._documentoEditService.doChangeCard('inteligencia');
    }

    showAcessoRestrito(): void {
        if (this.activeCard !== 'acesso-restrito') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'acesso-restrito')])
                .then();
        }
        // this._documentoEditService.doChangeCard('acesso-restrito');
    }

    showSigilo(): void {
        if (this.activeCard !== 'sigilos') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'sigilos')])
                .then();
        }
        // this._documentoEditService.doChangeCard('sigilos');
    }

    showAssinaturas(): void {
        if (this.activeCard !== 'assinaturas') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'assinaturas')])
                .then();
        }
        // this._documentoEditService.doChangeCard('assinaturas');
    }

    showComponentesDigitais(): void {
        if (this.activeCard !== 'componentes-digitais') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'componentes-digitais')])
                .then();
        }
        // this._documentoEditService.doChangeCard('componentesDigitais');
    }

    showJuntadas(): void {
        if (this.activeCard !== 'juntadas') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'juntadas')])
                .then();
        }
        // this._documentoEditService.doChangeCard('juntadas');
    }

    showForm(): void {
        if (this.activeCard !== 'dados-basicos') {
            this._router.navigate([this.routerState.url.replace(this.routerState.params.sidebarHandle, 'dados-basicos')])
                .then();
        }
        // this._documentoEditService.doChangeCard('form');
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({documento: this.documento, etiqueta: etiqueta}));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta({
            documentoId: this.documento.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }
}

