import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './assinatura-list/store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'assinaturas',
    templateUrl: './assinaturas.component.html',
    styleUrls: ['./assinaturas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AssinaturasComponent implements OnInit {

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.AssinaturaListAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('assinaturas/listar') > -1) {
                this.action = 'listar';
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }
}
