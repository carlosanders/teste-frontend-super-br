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
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'componente-digital',
    templateUrl: './componente-digital.component.html',
    styleUrls: ['./componente-digital.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalComponent implements OnInit, OnDestroy {

    routerState: any;

    /**
     * @param _changeDetectorRef
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.ComponenteDigitalAppState>,
    ) {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadComponenteDigital());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


}
