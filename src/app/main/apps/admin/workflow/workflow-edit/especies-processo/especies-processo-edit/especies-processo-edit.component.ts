import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnChanges,
    OnInit,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {cdkAnimations} from '@cdk/animations';
import {EspecieProcesso, Pagination} from '@cdk/models';
import {LoginService} from '../../../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../../../store';

@Component({
    selector: 'workflow-especies-processo-edit',
    templateUrl: './especies-processo-edit.component.html',
    styleUrls: ['./especies-processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspeciesProcessoEditComponent implements OnInit, OnChanges {

    routerState: any;
    isSaving: boolean;
    errors: any;
    form: FormGroup;
    pagination: any;
    especieProcessoGridPagination: Pagination;
    especieProcessoAutocompletePagination: Pagination;
    activeCard: string = 'form';


    constructor(
        private _store: Store<fromStore.WorkflowEspeciesProcessoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this._store.pipe(select(fromStore.getIsSaving))
            .subscribe((isSaving) => {
                this.isSaving = isSaving;
            });

        this._store.pipe(select(fromStore.getErrors))
            .subscribe((erros) => {
                this.errors = erros;
            });

        this.especieProcessoGridPagination = new Pagination();
        this.especieProcessoGridPagination.filter = {
            'workflow': 'isNull'
        };

        this.especieProcessoAutocompletePagination = new Pagination();
        this.especieProcessoAutocompletePagination.filter = {
            'workflow': 'isNull'
        };

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.form = this._formBuilder.group({
            id: [null],
            especieProcesso: [null, [Validators.required]]
        });

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
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


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(): void {
        if (this.form.valid) {
            this._store.dispatch(new fromStore.UpdateEspecieProcesso(
                {
                    especieProcesso: this.form.value.especieProcesso,
                    changes: {workflow: this.routerState.params.workflowHandle},
                    filter: {'workflow': 'eq:'+this.routerState.params.workflowHandle}
                }
            ));
        }
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    showEspecieProcessoGrid(): void {
        this.activeCard = 'especie-processo-gridsearch';
    }

    selectEspecieProcesso(especieProcesso: EspecieProcesso): void {
        if (especieProcesso) {
            this.form.get('especieProcesso').setValue(especieProcesso);
        }

        this.closeGridSearch();
    }

    closeGridSearch(): void {
        this.activeCard = 'form';
    }


}
