import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {Pagination, TransicaoWorkflow, VinculacaoTransicaoWorkflow} from '@cdk/models';
import {Back, getRouterState} from 'app/store';
import {CdkUtils} from '@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'sub-workflow-edit',
    templateUrl: './sub-workflow-edit.component.html',
    styleUrls: ['./sub-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SubWorkflowEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflow = new VinculacaoTransicaoWorkflow();
    workflowPagination: Pagination = new Pagination();
    formVinculacaoTransicaoWorkflow: FormGroup;
    visibleFields: Array<string> = [
        'workflow'
    ];

    constructor(private _store: Store<fromStore.VinculacaoTransicaoWorkflowAppState>,
                private _router: Router,
                private _formBuilder: FormBuilder) 
    {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.loadForm();
    }

    ngOnInit(): void {
        this.workflowPagination.filter = {
            id: `neq:${this.routerState.params['workflowHandle']}`
        }
    }

    loadForm(): void {
        this.formVinculacaoTransicaoWorkflow = this._formBuilder.group({
            transicaoWorkflow: [null],
            workflow: [null, [Validators.required]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params['transicaoWorkflowHandle'];
        const vinculacaoTransicaoWorkflow = new VinculacaoTransicaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoTransicaoWorkflow[key] = value;
            }
        );
        vinculacaoTransicaoWorkflow.transicaoWorkflow = transicaoWorkflow;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVinculacaoTransicaoWorkflow({
            vinculacaoTransicaoWorkflow: vinculacaoTransicaoWorkflow,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
