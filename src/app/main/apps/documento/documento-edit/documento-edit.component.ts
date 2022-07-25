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
import {Observable, of, Subject} from 'rxjs';
import * as fromStore from '../store';
import {ComponenteDigital, Documento, Etiqueta, Pagination, Tarefa, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, take, takeUntil} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {getTarefa} from '../../tarefas/tarefa-detail/store';
import {LoginService} from '../../../auth/login/login.service';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoEditService} from './shared/documento-edit.service';
import {CdkUtils} from '@cdk/utils';
import {MatDialog} from '@angular/material/dialog';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Component({
    selector: 'documento-edit',
    templateUrl: './documento-edit.component.html',
    styleUrls: ['./documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicForm', {read: ViewContainerRef}) containerForm: ViewContainerRef;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    documentoPrincipal: Documento;

    currentComponenteDigital$: Observable<ComponenteDigital>;
    currentComponenteDigital: ComponenteDigital;

    documento: Documento;

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
    private _unsubscribeAll: Subject<any> = new Subject();

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
     * @param _matDialog
     * @param _componenteDigitalService
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
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));

        if (this._router.url.indexOf('/juntadas') === -1 && this._router.url.indexOf('/tarefa/') !== -1) {
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
                    // eslint-disable-next-line max-len
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
        if (this._router.url.indexOf('/juntadas') === -1 && this._router.url.indexOf('/tarefa/') !== -1) {
            this.tarefa$.pipe(
                takeUntil(this._unsubscribeAll)
            ).subscribe((tarefa) => {
                this.tarefa = tarefa;
            });
        }
        this.currentComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            const path = 'app/main/apps/documento/documento-edit';
            modulesConfig.forEach((module) => {
                if (module.components.hasOwnProperty(path)) {
                    module.components[path].forEach(((c) => {
                        this._dynamicService.loadComponent(c)
                            .then((componentFactory) => {
                                this.container.createComponent(componentFactory);
                                this._ref.markForCheck();
                            });
                    }));
                }

                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividade') &&
                    module.routerLinks[path]['atividade'].hasOwnProperty(this.routerState.params.generoHandle)) {
                    this.routeAtividade = module.routerLinks[path]['atividade'][this.routerState.params.generoHandle];
                }
            });
        });

        this.documento$.pipe(
            filter(documento => !this.documento || (documento && (documento.id !== this.documento.id))),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
            if (documento && documento.estaVinculada) {
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
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
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
                        .then((componentFactory) => {
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onClickedDocumentoVinculado(documento: Documento): void {
        if (this.documento.estaVinculada) {
            return this.navigateToDocumento(documento);
        }
        this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
            if (result) {
                this._componenteDigitalService.saving.next(false);
                return this.navigateToDocumento(documento);
            }
        });
    }

    navigateToDocumento(documento: Documento): void {
        let sidebar = 'editar/atividade';
        let primary: string;
        primary = 'componente-digital/';
        if (documento.componentesDigitais[0]) {
            primary += documento.componentesDigitais[0].id;
        } else {
            primary += '0';
        }
        if (documento.estaVinculada) {
            sidebar = 'editar/dados-basicos';
        }
        this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + documento.id, {
                outlets: {
                    primary: primary,
                    sidebar: sidebar
                }
            }],
            {
                relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
            }).then();
    }

    hasChanges(): boolean {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) && editor.instances[editorInstance]) {
                    if (editor.instances[editorInstance].checkDirty()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    podeNavegarDoEditor(): Observable<boolean> {
        if (this.hasChanges()) {
            this._componenteDigitalService.doEditorSave.next(true);
            return this._componenteDigitalService.completedEditorSave.asObservable();
        } else {
            return of(true);
        }
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({documento: this.documento, etiqueta: etiqueta, operacaoId: operacaoId}));
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

