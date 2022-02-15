import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {Setor} from '@cdk/models';
import {Back} from '../../../../../../store';

@Component({
    selector: 'admin-localizadores',
    templateUrl: './localizadores.component.html',
    styleUrls: ['./localizadores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class LocalizadoresComponent implements OnInit, OnDestroy {

    setor$: Observable<Setor>;

    action = '';
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.RootLocalizadoresState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('localizadores/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('localizadores/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('localizadores/editar/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });

        this.setor$ = this._store.pipe(select(fromStore.getSetor));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Localizadores';
        } else if (this.action === 'criar') {
            return 'Novo Localizador';
        } else if (this.action === 'editar') {
            return 'Alterar Localizador';
        }
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
