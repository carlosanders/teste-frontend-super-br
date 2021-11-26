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
import {Back} from '../../../../../store';
import {Setor} from '@cdk/models';

@Component({
    selector: 'admin-setor',
    templateUrl: './setor.component.html',
    styleUrls: ['./setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorComponent implements OnInit, OnDestroy {

    unidade$: Observable<Setor>;

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
        private _store: Store<fromStore.SetorState>,
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
            if (this.routerState.url.indexOf('setores/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('setores/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('setores/editar/criar') > -1) {
                this.action = 'criar';
            }
            if (this.routerState.url.indexOf('lotacoes') > -1) {
                this.action = 'lotacoes';
            }
            if (this.routerState.url.indexOf('localizadores') > -1) {
                this.action = 'localizadores';
            }
            this._changeDetectorRef.markForCheck();
        });

        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Setores - ';
        } else if (this.action === 'criar') {
            return 'Novo Setor - ';
        } else if (this.action === 'editar') {
            return 'Alterar Setor - ';
        } else if (this.action === 'lotacoes') {
            return '';
        }
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
