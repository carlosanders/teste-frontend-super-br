import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {Pagination, Workflow} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

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
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    workflow: Workflow;
    workflow$: Observable<Workflow>;
    formWorkflow: FormGroup;
    pagination: any;

    especieTarefaPagination: Pagination;


    constructor(
        private _store: Store<fromStore.WorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.workflow$ = this._store.pipe(select(fromStore.getWorkflow));

        this.especieTarefaPagination = new Pagination();

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
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
            especieTarefaInicial: [null, [Validators.required]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]]
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitWorkflow(values): void {
        const workflow = new Workflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                workflow[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveWorkflow(workflow));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
