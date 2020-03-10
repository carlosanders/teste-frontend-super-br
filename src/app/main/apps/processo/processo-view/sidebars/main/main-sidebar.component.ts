import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Juntada} from '@cdk/models';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'processo-view-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewMainSidebarComponent implements OnInit {

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    isLoading$: Observable<boolean>;

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;

    index$: Observable<any>;
    index: {};

    animationDirection: 'left' | 'right' | 'none';

    pagination$: any;
    pagination: any;

    listFilter: {} = {};
    listSort: {} = {};

    showListFilter = false;

    form: FormGroup;

    @Output()
    scrolled = new EventEmitter<any>();

    /**
     * Constructor
     *
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ProcessoViewAppState>,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            tipoDocumento: [null]
        });

        // Set the defaults
        this.animationDirection = 'none';

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.index$ = this._store.pipe(select(fromStore.getIndex));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));

        this.juntadas$.pipe(filter(juntadas => !!juntadas)).subscribe(
            juntadas => {
                this.juntadas = juntadas;
                this.totalSteps = juntadas.length;
            }
        );

        this.currentStep$.subscribe(
            currentStep => {
                this.currentStep = currentStep;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.index$.subscribe(
            index => this.index = index
        );

        this.pagination$.subscribe(
            pagination => this.pagination = pagination
        );
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('tipoDocumento').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.listFilter = {
                    ...this.listFilter,
                    'documento.tipoDocumento.id': `eq:${value.id}`
                };
            } else {
                if (this.listFilter.hasOwnProperty('documento.tipoDocumento.id')) {
                    delete this.listFilter['documento.tipoDocumento.id'];
                }
            }
        });
    }

    onScroll(): void {
        this.scrolled.emit();
    }

    /**
     *
     * @param step
     * @param ativo
     */
    gotoStep(step, ativo): void {
        if (this.juntadas[this.currentStep.step] === undefined || !ativo) {
            return;
        }

        // Decide the animation direction
        this.animationDirection = this.currentStep.step < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: 0}));
    }

    reload(params): void {

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetJuntadas(nparams));
    }

    doSort(sort: any): void {
        this.listSort = sort;
        this.reload({listSort: sort});
    }

    toggleFilter(): void {
        this.showListFilter = !this.showListFilter;
    }

    pesquisar(): void {
        this.reload({listFilter: this.listFilter});
        this.toggleFilter();
    }

    limpar(): void {
        this.listFilter = {};
        this.reload({listFilter: this.listFilter});
        this.toggleFilter();
        this.form.reset();
    }
}
