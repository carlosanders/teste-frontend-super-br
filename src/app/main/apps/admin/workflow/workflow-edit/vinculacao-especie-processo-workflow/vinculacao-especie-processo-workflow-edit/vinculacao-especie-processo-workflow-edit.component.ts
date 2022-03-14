import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {EspecieProcesso, Pagination, VinculacaoEspecieProcessoWorkflow, Workflow} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from 'app/store';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'vinculacao-especie-processo-workflow-edit',
    templateUrl: './vinculacao-especie-processo-workflow-edit.component.html',
    styleUrls: ['./vinculacao-especie-processo-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoEspecieProcessoWorkflowEditComponent implements OnInit, OnChanges, OnDestroy {

    routerState: any;
    isSaving: boolean;
    errors: any;
    form: FormGroup;
    pagination: any;
    especieProcessoPagination: Pagination;
    workflow: Workflow;
    activeCard: string = 'form';
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _store: Store<fromStore.VinculacaoEspecieProcessoWorkflowEditAppState>,
                private _router: Router,
                private _loginService: LoginService,
                private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef)
    {
        this._store.pipe(
            select(fromStore.getIsSaving),
            takeUntil(this._unsubscribeAll)
        ).subscribe((isSaving: boolean) => {
            this.isSaving = isSaving;
        });

        this._store.pipe(
            select(fromStore.getErrors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((erros) => {
            this.errors = erros;
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(fromStore.getWorkflow(this.routerState.params['workflowHandle'])),
            takeUntil(this._unsubscribeAll)
        ).subscribe((workflow: Workflow) => {
            this.workflow = workflow;
        });

        this.form = this._formBuilder.group({
            id: [null],
            especieProcesso: [null, [Validators.required]]
        });
    }

    ngOnInit(): void
    {
        this.especieProcessoPagination = new Pagination();
        this.especieProcessoPagination.filter =
            {
                'generoProcesso.id': `eq: ${this.workflow.generoProcesso.id}`,
                orX: [
                    {
                        'vinculacoesEspecieProcessoWorkflow.workflow.id': `neq:${this.routerState.params['workflowHandle']}`,
                        'ativo': 'eq:1'
                    },
                    {'vinculacoesEspecieProcessoWorkflow.workflow': `isNull`}
                ]
            };
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void
    {
        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(): void
    {
        if (this.form.valid) {
            const workflow = new Workflow();
            workflow.id = this.routerState.params['workflowHandle'];
            const vinculacaoEspecieProcessoWorkflow = new VinculacaoEspecieProcessoWorkflow();
            vinculacaoEspecieProcessoWorkflow.especieProcesso = this.form.value.especieProcesso;
            vinculacaoEspecieProcessoWorkflow.workflow = workflow;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveVinculacaoEspecieProcessoWorkflow(
                {
                    vinculacaoEspecieProcessoWorkflow: vinculacaoEspecieProcessoWorkflow,
                    operacaoId: operacaoId
                }
            ));
        }
    }

    doAbort(): void
    {
        this._store.dispatch(new Back());
    }

    showEspecieProcessoGrid(): void
    {
        this.activeCard = 'especie-processo-gridsearch';
    }

    selectEspecieProcesso(especieProcesso: EspecieProcesso): void
    {
        if (especieProcesso) {
            this.form.get('especieProcesso').setValue(especieProcesso);
        }

        this.closeGridSearch();
    }

    closeGridSearch(): void
    {
        this.activeCard = 'form';
    }


}
