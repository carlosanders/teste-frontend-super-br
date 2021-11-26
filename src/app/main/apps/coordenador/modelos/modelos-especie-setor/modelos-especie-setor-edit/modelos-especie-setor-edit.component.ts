import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {ModalidadeOrgaoCentral, Modelo, Setor, VinculacaoModelo} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'modelos-especie-setor-edit',
    templateUrl: './modelos-especie-setor-edit.component.html',
    styleUrls: ['./modelos-especie-setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEspecieSetorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    vinculacaoModelo$: Observable<VinculacaoModelo>;
    vinculacaoModelo: VinculacaoModelo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral;
    especieSetorPagination: Pagination;
    unidade$: Observable<Setor>;
    unidade: Setor;
    private _unsubscribeAll: Subject<any> = new Subject();

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
        this.modalidadeOrgaoCentral$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentral));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
            filter(vinculacaoModelo => !!vinculacaoModelo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((vinculacaoModelo) => {
            this.vinculacaoModelo = vinculacaoModelo;
        });

        this.modalidadeOrgaoCentral$.pipe(
            filter(modalidadeOrgaoCentral => !!modalidadeOrgaoCentral),
            takeUntil(this._unsubscribeAll)
        ).subscribe((modalidadeOrgaoCentral) => {
            this.modalidadeOrgaoCentral = modalidadeOrgaoCentral;
        });

        this.unidade$.pipe(
            filter(unidade => !!unidade),
            takeUntil(this._unsubscribeAll)
        ).subscribe((unidade) => {
            this.unidade = unidade;
        });

        this.modelo$.pipe(
            filter(modelo => !!modelo),
            takeUntil(this._unsubscribeAll)
        ).subscribe((modelo) => {
            this.modelo = modelo;
        });

        if (!this.vinculacaoModelo) {
            this.vinculacaoModelo = new VinculacaoModelo();
            this.vinculacaoModelo.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
            this.vinculacaoModelo.modelo = this.modelo;
            this.vinculacaoModelo.unidade = this.unidade;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
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
        vinculacaoModelo.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
        vinculacaoModelo.unidade = this.unidade;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveModeloEspecieSetor({
            vinculacaoModelo: vinculacaoModelo,
            operacaoId: operacaoId
        }));
    }

}
