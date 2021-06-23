import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {select, Store} from '@ngrx/store';
import {ComponenteDigital} from '@cdk/models';

@Component({
    selector: 'componente-digital-view',
    templateUrl: './componente-digital-view.component.html',
    styleUrls: ['./componente-digital-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalViewComponent implements OnInit, OnDestroy {
    componenteDigital$: Observable<ComponenteDigital>;
    isLoading$: Observable<boolean>;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.ComponenteDigitalAppState>
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
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
        // Unsubscribe from all subscriptions
    }

}
