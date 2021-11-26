import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './vinculacao-pessoa-barramento-list/store';

import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../../store';

@Component({
    selector: 'vinculacao-pessoa-barramento',
    templateUrl: './vinculacao-pessoa-barramento.component.html',
    styleUrls: ['./vinculacao-pessoa-barramento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoPessoaBarramentoComponent implements OnInit, OnDestroy {

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
        private _store: Store<fromStore.VinculacaoPessoaBarramentoListAppState>,
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
            if (this.routerState.url.indexOf('vinculacao-pessoa-barramento/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('vinculacao-pessoa-barramento/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('vinculacao-pessoa-barramento/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([
                this.routerState.url.replace(('vinculacao-pessoa-barramento/editar/' + this.routerState.params.vincPessoaBarramentoHandle), 'vinculacao-pessoa-barramento/listar')
            ]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('vinculacao-pessoa-barramento/criar', 'vinculacao-pessoa-barramento/listar')]).then();
        }
    }
}
