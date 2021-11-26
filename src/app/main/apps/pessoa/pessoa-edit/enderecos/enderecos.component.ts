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
import * as fromStore from './endereco-list/store';
import {getRouterState} from '../../../../../store';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'enderecos',
    templateUrl: './enderecos.component.html',
    styleUrls: ['./enderecos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EnderecosComponent implements OnInit, OnDestroy {

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
        private _store: Store<fromStore.EnderecoListAppState>,
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
            if (this.routerState.url.indexOf('enderecos/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('enderecos/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('enderecos/criar') > -1) {
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
            this._router.navigate([this.routerState.url.replace(('enderecos/editar/' + this.routerState.params.enderecoHandle), 'enderecos/listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('enderecos/criar', 'enderecos/listar')]).then();
        }
    }
}
