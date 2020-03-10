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
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {getRouterState, getScreenState} from 'app/store/reducers';

import {locale as english} from 'app/main/apps/arquivista/i18n/en';


import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';

import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {ToggleMaximizado} from 'app/main/apps/arquivista/arquivista-list/store';
import {Usuario} from '../../../../../@cdk/models/usuario.model';



@Component({
    selector: 'arquivista-list',
    templateUrl: './arquivista-list.component.html',
    styleUrls: ['./arquivista-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaListComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    currentProcessoId: number;
    processos: Processo[] = [];
    processoListSize = 35;
    processoListOriginalSize: number;

    processos$: Observable<Processo[]>;
    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedProcessos$: Observable<Processo[]>;

    selectedProcessos: Processo[] = [];

    screen$: Observable<any>;

    filter = {};

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;



    private _profile: Usuario;

    mobileMode = false;

    @ViewChild('processoListElement', {read: ElementRef, static: true}) processoListElement: ElementRef;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _processoService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _processoService: ProcessoService,
        private _router: Router,
        private _store: Store<fromStore.ArquivistaAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.selectedProcessos$ = this._store.pipe(select(fromStore.getSelectedProcessos));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedProcessoIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingProcessoIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedProcessoIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();


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
            this.currentProcessoId = parseInt(routerState.state.params['processoHandle'], 0);
        });

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe(processos => {
            this.processos = processos;
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

        this.selectedProcessos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedProcessos => {
            this.selectedProcessos = selectedProcessos;
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
    }

    ngAfterViewInit(): void {
        this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
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

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }



    onScroll(): void {
        if (this.processos.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            limit: this.pagination.limit + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

    setCurrentProcesso(processo: Processo): void {
        this._store.dispatch(new fromStore.SetCurrentProcesso({
            processoId: processo.id,
            acessoNegado: processo.acessoNegado
        }));
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
        this._store.dispatch(new fromStore.ChangeSelectedProcessos(ids));
    }


    onResizeEndProcessoList(event: ResizeEvent): void {
        const potencialProcessoListSize = (event.rectangle.width * this.processoListSize) / this.processoListOriginalSize;

        if (potencialProcessoListSize < 30) {
            this.processoListSize = 30;
            setTimeout(() => {
                this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialProcessoListSize > 50) {
            this.processoListSize = 50;
            this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.processoListSize = (event.rectangle.width * this.processoListSize) / this.processoListOriginalSize;
        this.processoListOriginalSize = event.rectangle.width;
    }


    doEtiquetarBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doClassificacaoBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/vinculacao-etiqueta-bloco']).then();
    }



}
