import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {cdkAnimations} from '@cdk/animations';
import {getRouterState} from '../../../../../../../store';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'transicao-workflow-edit',
    templateUrl: './transicao-workflow-edit.component.html',
    styleUrls: ['./transicao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoWorkflowEditComponent implements OnInit {

    routerState: any;

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.TransicaoWorkflowEditAppState>,
    ) {
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
