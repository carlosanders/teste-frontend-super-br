import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../dados-basicos/store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'regras-etiqueta',
    templateUrl: './regras-etiqueta.component.html',
    styleUrls: ['./regras-etiqueta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegrasEtiquetaComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.EtiquetaEditAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('regras/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('regras/editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
        if (this.action === 'listar') {
            this._router.navigate([this.routerState.url.replace('editar/' + this.routerState.params.etiquetaHandle + '/regras/listar', 'listar')]).then();
        }
    }
}
