import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Setor} from '@cdk/models/setor.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'unidade-edit',
    templateUrl: './unidade-edit.component.html',
    styleUrls: ['./unidade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UnidadeEditComponent implements OnInit, OnDestroy {

    routerState: any;
    unidade$: Observable<Setor>;
    unidade: Setor;
    isSaving$: Observable<boolean>;
    saving: boolean;
    errors$: Observable<any>;
    usuario: Usuario;
    generoSetorPagination: Pagination;
    setorPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.UnidadeEditAppState>,
        public _loginService: LoginService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.usuario = this._loginService.getUserProfile();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            parent: 'isNull'
        };
        this.generoSetorPagination = new Pagination();
        this.generoSetorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.unidade$.pipe(
            filter(unidade => !!unidade),
            takeUntil(this._unsubscribeAll)
        ).subscribe(setor => this.unidade = setor);

        if (!this.unidade) {
            this.unidade = new Setor();
            this.unidade.ativo = true;
        }

        this.isSaving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((save) => {
            this.saving = save;
            this._changeDetectorRef.markForCheck();
        });
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
        const unidade = new Setor();
        Object.entries(values).forEach(
            ([key, value]) => {
                unidade[key] = value;
            }
        );

        if (!unidade.sequenciaInicialNUP) {
            unidade.sequenciaInicialNUP = 0;
        }

        if (!unidade.unidade) {
            const unid = new Setor();
            unid.id = values.id;
            unidade.unidade = unid;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveUnidade({
            unidade: unidade,
            operacaoId: operacaoId
        }));
    }
}
