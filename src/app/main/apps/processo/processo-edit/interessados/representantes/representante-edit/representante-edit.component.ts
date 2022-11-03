import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {cdkAnimations} from '@cdk/animations';

import {Interessado, Representante} from '@cdk/models';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import {Back} from 'app/store';
import {getRouterState, RouterStateUrl} from 'app/store/reducers';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import * as fromStore from './store';

@Component({
    selector: 'representante-edit',
    templateUrl: './representante-edit.component.html',
    styleUrls: ['./representante-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepresentanteEditComponent implements OnInit, OnDestroy {

    representante$: Observable<Representante>;
    representante: Representante;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    routerState: RouterStateUrl;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.RepresentanteEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.representante$ = this._store.pipe(select(fromStore.getRepresentante));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.representante$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            representante => this.representante = representante
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const representante = new Representante();

        Object.entries(values).forEach(
            ([key, value]) => {
                representante[key] = value;
            }
        );

        const interessado = new Interessado();
        interessado.id = this.routerState.params['interessadoHandle'];
        representante.interessado = interessado;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRepresentante({
            representante: representante,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
