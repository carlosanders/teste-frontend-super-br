import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {Processo} from '@cdk/models/processo.model';
import * as fromStore from 'app/main/apps/processo/store';

import {locale as english} from 'app/main/apps/processo/i18n/en';
import {fuseAnimations} from '@fuse/animations';
import {getRouterState} from '../../../store/reducers';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from '../../auth/login/login.service';
import {Router} from '@angular/router';
import {Usuario} from "../../../../@cdk/models/usuario.model";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    processo$: Observable<Processo>;
    processo: Processo;

    loading$: Observable<boolean>;
    routerState: any;

    routerState$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;
    savingVincEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    chaveAcesso: string;

    private _profile: Usuario;

    /**
     *
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param _fuseTranslationLoaderService
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _store: Store<fromStore.ProcessoAppState>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        // Set the defaults
        this._profile = _loginService.getUserProfile();
        this._fuseTranslationLoaderService.loadTranslations(english);
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.loading$ = this._store.pipe(select(fromStore.getProcessoIsLoading));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:PROCESSO'
        };
        this.savingVincEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVincEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.routerState$ = this._store.pipe(select(getRouterState));
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
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({processo: this.processo, etiqueta: etiqueta}));
    }

    /*onEtiquetaEdit(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta
        }));
    }*/

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
}
