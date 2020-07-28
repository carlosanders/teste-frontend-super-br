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
import {VinculacaoModelo, Modelo, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Back} from 'app/store/actions';

@Component({
    selector: 'modelos-especie-setor-edit',
    templateUrl: './modelos-especie-setor-edit.component.html',
    styleUrls: ['./modelos-especie-setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEspecieSetorEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    vinculacaoModelo$: Observable<VinculacaoModelo>;
    vinculacaoModelo: VinculacaoModelo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral;
    especieSetorPagination: Pagination;
    unidade$: Observable<Setor>;
    unidade: Setor;

    /**
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.ModelosEspecieSetorEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoModelo$ = this._store.pipe(select(fromStore.getVinculacaoModelo));
        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(routerState => {
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

        this.vinculacaoModelo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            vinculacaoModelo => {
                if (vinculacaoModelo) {
                    this.vinculacaoModelo = vinculacaoModelo;
                }
            }
        );

        this.orgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            orgaoCentral => {
                if (orgaoCentral) {
                    this.orgaoCentral = orgaoCentral;
                }
            }
        );

        this.unidade$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            unidade => {
                if (unidade) {
                    this.unidade = unidade;
                }
            }
        );

        this.modelo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            modelo => {
                if (modelo) {
                    this.modelo = modelo;
                }
            }
        );

        if (!this.vinculacaoModelo) {
            this.vinculacaoModelo = new VinculacaoModelo();
            this.vinculacaoModelo.orgaoCentral = this.orgaoCentral;
            this.vinculacaoModelo.modelo = this.modelo;
            this.vinculacaoModelo.unidade = this.unidade;
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

        const vinculacaoModelo = new VinculacaoModelo();
        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoModelo[key] = value;
            }
        );

        vinculacaoModelo.modelo = this.modelo;
        vinculacaoModelo.orgaoCentral = this.orgaoCentral;
        vinculacaoModelo.unidade = this.unidade;

        this._store.dispatch(new fromStore.SaveModeloEspecieSetor(vinculacaoModelo));
    }

}
