import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../../store';
import {Back} from '../../../../../../store';
import {Setor} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'competencia-edit',
    templateUrl: './competencia-edit.component.html',
    styleUrls: ['./competencia-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompetenciaEditComponent implements OnInit, OnDestroy {

    routerState: any;
    vinculacaoSetorMunicipio$: Observable<VinculacaoSetorMunicipio>;
    vinculacaoSetorMunicipio: VinculacaoSetorMunicipio;
    unidade$: Observable<Setor>;
    unidade: Setor;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    municipioPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.CompetenciaEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoSetorMunicipio$ = this._store.pipe(select(fromStore.getCompetencia));
        this.usuario = this._loginService.getUserProfile();
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.municipioPagination = new Pagination();
        this.municipioPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.vinculacaoSetorMunicipio$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(vinculacaoSetorMunicipio => this.vinculacaoSetorMunicipio = vinculacaoSetorMunicipio);

        this.unidade$.pipe(
            filter(setor => !!setor),
            takeUntil(this._unsubscribeAll)
        ).subscribe((setor) => {
            this.unidade = setor;
        });

        if (!this.vinculacaoSetorMunicipio) {
            this.vinculacaoSetorMunicipio = new VinculacaoSetorMunicipio();
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
        const vinculacaoSetorMunicipio = new VinculacaoSetorMunicipio();
        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoSetorMunicipio[key] = value;
            }
        );

        vinculacaoSetorMunicipio.setor = this.unidade;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveCompetencia({
            vinculacaoSetorMunicipio: vinculacaoSetorMunicipio,
            operacaoId: operacaoId
        }));
    }
}
