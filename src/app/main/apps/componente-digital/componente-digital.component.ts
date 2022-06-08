import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Observable} from "rxjs";
import {ComponenteDigital} from "@cdk/models";

@Component({
    selector: 'componente-digital',
    templateUrl: './componente-digital.component.html',
    styleUrls: ['./componente-digital.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalComponent implements OnInit, OnDestroy {

    componenteDigital$: Observable<ComponenteDigital>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.ComponenteDigitalAppState>
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
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
        this._store.dispatch(new fromStore.UnloadComponenteDigital());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
