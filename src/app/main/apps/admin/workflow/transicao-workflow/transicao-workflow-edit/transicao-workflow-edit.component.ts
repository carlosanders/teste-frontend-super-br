import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {Pagination, TransicaoWorkflow, Workflow} from '@cdk/models';
import {LoginService} from '../../../../../auth/login/login.service';
import {getRouterState} from '../../../../../../store/reducers';
import {Back} from '../../../../../../store/actions';

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
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    transicaoWorkflow: Workflow;
    transicaoWorkflow$: Observable<Workflow>;
    formWorkflow: FormGroup;
    pagination: any;

    especieTarefaPagination: Pagination;
    especieAtividadePagination: Pagination;
    workflowPagination: Pagination;


    constructor(
        private _store: Store<fromStore.TransicaoWorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.transicaoWorkflow$ = this._store.pipe(select(fromStore.getTransicaoWorkflow));

        this.especieTarefaPagination = new Pagination();
        this.especieAtividadePagination = new Pagination();
        this.workflowPagination = new Pagination();
        this.workflowPagination.populate = ['populateAll', 'especieProcesso'];

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formWorkflow = this._formBuilder.group({
            id: [null],
            workflow: [null],
            especieAtividade: [null, [Validators.required]],
            especieTarefaFrom: [null, [Validators.required]],
            especieTarefaTo: [null, [Validators.required]],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitWorkflow(values): void {
        const transicaoWorkflow = new TransicaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                transicaoWorkflow[key] = value;
            }
        );

        const workflow = new Workflow();
        workflow.id = parseInt(this.routerState.params.workflowHandle);
        transicaoWorkflow.workflow = workflow;
        this._store.dispatch(new fromStore.SaveTransicaoWorkflow(transicaoWorkflow));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
