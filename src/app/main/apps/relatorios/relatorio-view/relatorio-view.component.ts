import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'relatorio-view',
    templateUrl: './relatorio-view.component.html',
    styleUrls: ['./relatorio-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioViewComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    binary$: Observable<any>;

    relatorios$: Observable<Relatorio[]>;
    relatorios: Relatorio[] = [];

    index$: Observable<any>;
    index: {};

    animationDirection: 'left' | 'right' | 'none';

    @ViewChildren(CdkPerfectScrollbarDirective)
    cdkScrollbarDirectives: QueryList<CdkPerfectScrollbarDirective>;

    fileName = '';

    src: any;
    loading = false;

    pagination$: any;
    pagination: any;

    routerState: any;
    routerState$: Observable<any>;

    chaveAcesso: string;

    @Output()
    select: EventEmitter<ComponenteDigital> = new EventEmitter();

    /**
     *
     * @param _relatorioService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _relatorioService: RelatorioService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.RelatorioViewAppState>
    ) {
        console.log('aqui');

        this.binary$ = this._store.pipe(select(fromStore.getBinary));

        this.relatorios$ = this._store.pipe(select(fromStore.getRelatorios));
        this.index$ = this._store.pipe(select(fromStore.getIndex));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.relatorios$.pipe(filter(relatorios => !!relatorios)).subscribe(
            relatorios => {
                this.relatorios = relatorios;
                this.totalSteps = relatorios.length;
            }
        );

        this.index$.subscribe(
            index => this.index = index
        );

        this.binary$.subscribe(
            binary => {
                if (binary.src && binary.src.conteudo) {
                    const byteCharacters = atob(binary.src.conteudo.split(';base64,')[1]);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {type: binary.src.mimetype});
                    const   URL = window.URL;
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    this.fileName = binary.src.fileName;
                    this.select.emit(binary.src);
                } else {
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
                }
                this.loading = binary.loading;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.pagination$.subscribe(
            pagination => this.pagination = pagination
        );

        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');

    }

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

        // this._store.dispatch(new fromStore.SetCurrentStep({step: 0, subStep: 0}));
    }

    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadRelatorios({reset: true}));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    onScroll(): void {

        if (this.relatorios.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetRelatorios(nparams));
    }
}
