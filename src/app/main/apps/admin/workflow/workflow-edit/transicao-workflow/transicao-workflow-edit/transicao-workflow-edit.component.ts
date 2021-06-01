import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {Pagination, TransicaoWorkflow, Workflow} from '@cdk/models';
import {LoginService} from '../../../../../../auth/login/login.service';
import {getRouterState} from '../../../../../../../store';
import {Back} from '../../../../../../../store';

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
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
