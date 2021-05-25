import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {VinculacaoRepositorio, Repositorio, ModalidadeOrgaoCentral} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Back} from 'app/store/actions';

@Component({
    selector: 'repositorios-especie-setor-edit',
    templateUrl: './repositorios-especie-setor-edit.component.html',
    styleUrls: ['./repositorios-especie-setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEspecieSetorEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    vinculacaoRepositorio$: Observable<VinculacaoRepositorio>;
    vinculacaoRepositorio: VinculacaoRepositorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    repositorio$: Observable<Repositorio>;
    repositorio: Repositorio;
    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral;
    especieSetorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.RepositoriosEspecieSetorEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoRepositorio$ = this._store.pipe(select(fromStore.getVinculacaoRepositorio));
        this.modalidadeOrgaoCentral$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentral));
        this.repositorio$ = this._store.pipe(select(fromStore.getRepositorio));

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.especieSetorPagination = new Pagination();
        this.especieSetorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.vinculacaoRepositorio$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (vinculacaoRepositorio) => {
                if (vinculacaoRepositorio) {
                    this.vinculacaoRepositorio = vinculacaoRepositorio;
                }
            }
        );

        this.modalidadeOrgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (modalidadeOrgaoCentral) => {
                if (modalidadeOrgaoCentral) {
                    this.modalidadeOrgaoCentral = modalidadeOrgaoCentral;
                }
            }
        );

        this.repositorio$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (repositorio) => {
                if (repositorio) {
                    this.repositorio = repositorio;
                }
            }
        );

        if (!this.vinculacaoRepositorio) {
            this.vinculacaoRepositorio = new VinculacaoRepositorio();
            this.vinculacaoRepositorio.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
            this.vinculacaoRepositorio.repositorio = this.repositorio;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const vinculacaoRepositorio = new VinculacaoRepositorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoRepositorio[key] = value;
            }
        );

        vinculacaoRepositorio.repositorio = this.repositorio;
        vinculacaoRepositorio.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;

        this._store.dispatch(new fromStore.SaveRepositorioEspecieSetor(vinculacaoRepositorio));
    }

}
