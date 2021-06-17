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
import * as fromStore from '../store';
import {ComponenteDigital, Documento, Etiqueta, Pagination, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {getTarefa} from '../../tarefas/tarefa-detail/store/selectors';
import {LoginService} from '../../../auth/login/login.service';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {DocumentoEditService} from './shared/documento-edit.service';
import {ClickedDocumentoVinculado} from './anexos/store/actions';

@Component({
    selector: 'documento-edit',
    templateUrl: './documento-edit.component.html',
    styleUrls: ['./documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    documento$: Observable<Documento>;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    documentoPrincipal: Documento;

    currentComponenteDigital$: Observable<ComponenteDigital>;
    currentComponenteDigital: ComponenteDigital;

    documento: Documento;

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

    routeAtividade = 'atividade';

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
     * @param _activatedRoute
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
        private _activatedRoute: ActivatedRoute
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));

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
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
                }
            ]
        };

        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.vinculacaoEtiquetaErrors$ = this._store.pipe(select(fromStore.getVinculacaoEtiquetaErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.tarefa$.subscribe((tarefa) => {
                this.tarefa = tarefa;
            });
        }
        this.currentComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.documento$.pipe(
            filter(documento => !this.documento || (documento && (documento.id !== this.documento.id)))
        ).subscribe((documento) => {
            this.documento = documento;
            if (documento && documento.vinculacaoDocumentoPrincipal) {
                this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }

            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividade') &&
                module.routerLinks[path]['atividade'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividade = module.routerLinks[path]['atividade'][this.routerState.params.generoHandle];
            }
        });

        const path1 = 'app/main/apps/documento/documento-edit#form';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then( (componentFactory)  => {
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new ClickedDocumentoVinculado(documento));
    }

    back(): void {
        this._location.back();
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({documento: this.documento, etiqueta: etiqueta}));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta({
            documentoId: this.documento.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }
}

