import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Modelo, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {Router} from '@angular/router';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'modelo-edit',
    templateUrl: './modelo-edit.component.html',
    styleUrls: ['./modelo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloEditComponent implements OnInit, OnDestroy {
    routerState: any;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    templatePagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ModeloEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
        this.usuario = this._loginService.getUserProfile();

        this.templatePagination = new Pagination();
        this.templatePagination.populate = ['documento', 'documento.tipoDocumento'];

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.modelo$.subscribe((changeValues)=>{
            // eslint-disable-next-line no-debugger
            debugger;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.modelo$.pipe(
            filter(modelo => !!modelo),
            takeUntil(this._unsubscribeAll)
        ).subscribe(modelo => this.modelo = modelo);

        if (!this.modelo) {
            this.modelo = new Modelo();
            this.modelo.ativo = true;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        // eslint-disable-next-line no-debugger
        debugger;
        const modelo = new Modelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        modelo.usuario = this.usuario;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveModelo({
            modelo: modelo,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
