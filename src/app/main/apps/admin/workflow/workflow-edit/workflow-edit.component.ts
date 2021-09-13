import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from 'app/store/reducers';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'workflow-edit',
    templateUrl: './workflow-edit.component.html',
    styleUrls: ['./workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WorkflowEditComponent implements OnInit {

    routerState: any;

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.State>
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
