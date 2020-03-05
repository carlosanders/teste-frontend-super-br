import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {JuntadaService} from '@cdk/services/juntada.service';
import {Juntada} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'processo-view',
    templateUrl: './processo-view.component.html',
    styleUrls: ['./processo-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    binary$: Observable<any>;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    index$: Observable<any>;
    index: {};

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;

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
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.ProcessoViewAppState>
    ) {
        this.binary$ = this._store.pipe(select(fromStore.getBinary));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.index$ = this._store.pipe(select(fromStore.getIndex));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.juntadas$.pipe(filter(juntadas => !!juntadas)).subscribe(
            juntadas => {
                this.juntadas = juntadas;
                this.totalSteps = juntadas.length;
            }
        );

        this.currentStep$.subscribe(
            currentStep => this.currentStep = currentStep
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
        this._store.dispatch(new fromStore.UnloadJuntadas());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep.step === this.totalSteps - 1 && this.currentStep.subStep === this.index[this.currentStep.step].length - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let payload = {
            step: this.currentStep.step + 1,
            subStep: 0
        };

        if ((this.currentStep.subStep + 1) === this.index[this.currentStep.step].length - 1) {
            payload = {
                step: this.currentStep.step,
                subStep: this.currentStep.subStep + 1
            };
        }

        this._store.dispatch(new fromStore.SetCurrentStep(payload));
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep.step === 0 && this.currentStep.subStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let step = 0;
        let subStep = 0;

        if ((this.currentStep.subStep - 1) > 0) {
            subStep = this.currentStep.subStep - 1;
            step = this.currentStep.step;
        } else {
            if (this.currentStep.step > 0) {
                step = this.currentStep.step - 1;
                subStep = this.index[step].length - 1;
            }
        }

        this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: subStep}));
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    onScroll(): void {

        if (this.juntadas.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            limit: this.pagination.limit + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetJuntadas(nparams));
    }
}
