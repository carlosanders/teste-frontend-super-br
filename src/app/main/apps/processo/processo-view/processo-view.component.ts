import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {JuntadaService} from '@cdk/services/juntada.service';
import {Juntada} from '@cdk/models/juntada.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {Pessoa} from '../../../../../@cdk/models/pessoa.model';
import {ComponenteDigital} from '../../../../../@cdk/models/componente-digital.model';

@Component({
    selector: 'processo-view',
    templateUrl: './processo-view.component.html',
    styleUrls: ['./processo-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoViewComponent implements OnInit {

    binary$: Observable<any>;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    index$: Observable<any>;
    index: {};

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;

    animationDirection: 'left' | 'right' | 'none';

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    fileName = '';

    src: any;
    loading = false;

    @Output()
    select: EventEmitter<ComponenteDigital> = new EventEmitter();

    /**
     *
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.ProcessoViewAppState>
    ) {
        this.binary$ = this._store.pipe(select(fromStore.getBinary));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.index$ = this._store.pipe(select(fromStore.getIndex));

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
                    const blob = new Blob([byteArray], {type: binary.src.mimetype}),
                        URL = window.URL;
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

        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');

    }

    ngOnInit(): void {
        this._store.dispatch(new fromStore.SetCurrentStep({step: 0, subStep: 0}));
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
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
