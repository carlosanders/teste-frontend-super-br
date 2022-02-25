import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {Pagination, Workflow} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from 'app/store';
import {getWorkflow} from '../store';
import {CdkUtils} from '@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'workflow-dados-basicos',
    templateUrl: './workflow-dados-basicos.component.html',
    styleUrls: ['./workflow-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WorkflowDadosBasicosComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    workflow: Workflow;
    workflow$: Observable<Workflow>;
    formWorkflow: FormGroup;
    pagination: any;
    especieTarefaPagination: Pagination;
    generoProcessoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.WorkflowDadosBasicosAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.workflow$ = this._store.pipe(select(getWorkflow));

        this.especieTarefaPagination = new Pagination();
        this.generoProcessoPagination = new Pagination();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formWorkflow = this._formBuilder.group({
            id: [null],
            especieTarefaInicial: [null, [Validators.required]],
            generoProcesso: [null, [Validators.required]],
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveWorkflow({
            workflow: workflow,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
