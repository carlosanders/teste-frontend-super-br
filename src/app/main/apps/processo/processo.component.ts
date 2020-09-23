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
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Etiqueta, Pagination, Processo, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import * as fromStore from 'app/main/apps/processo/store';

import {locale as english} from 'app/main/apps/processo/i18n/en';
import {cdkAnimations} from '@cdk/animations';
import {getRouterState} from '../../../store/reducers';
import {LoginService} from '../../auth/login/login.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {modulesConfig} from '../../../../modules/modules-config';
import {DynamicService} from '../../../../modules/dynamic.service';

@Component({
    selector: 'processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    processo$: Observable<Processo>;
    processo: Processo;

    loading$: Observable<boolean>;
    routerState: any;

    routerState$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;
    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    chaveAcesso: string;
    steps$: Observable<boolean>;

    @ViewChild('dynamicComponent', {read: ViewContainerRef})
    container: ViewContainerRef;

    private _profile: Usuario;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _store
     * @param _loginService
     * @param _router
     * @param _dynamicService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _store: Store<fromStore.ProcessoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _dynamicService: DynamicService,
    ) {
        // Set the defaults
        this._profile = _loginService.getUserProfile();
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.loading$ = this._store.pipe(select(fromStore.getProcessoIsLoading));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:PROCESSO'
        };
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.steps$ = this._store.pipe(select(fromStore.getSteps));
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
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/processo';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    if (this.container !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then(componentFactory => this.container.createComponent(componentFactory));
                    }
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

    doAutuar(): void {
        this._store.dispatch(new fromStore.AutuarProcesso(this.processo));
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({processo: this.processo, etiqueta: etiqueta}));
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
            processoId: this.processo.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    visualizarProcessoNovaAba(): void {
        window.open(this.routerState.url.split('/')[1] + '/processo/' + this.processo.id
            + '/visualizar', '_blank');
    }

    imprimirEtiqueta(): void {
        this._router.navigate([this.routerState.url.split('processo/' + this.processo.id)[0] + 'processo/' + this.processo.id + '/' + 'etiqueta']).then();
    }

    arquivarProcesso(): void {
        this._store.dispatch(new fromStore.ArquivarProcesso(this.processo));
    }
}
