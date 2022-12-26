import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Criteria, Pagination, RegraEtiqueta} from '@cdk/models';

@Component({
    selector: 'cdk-regra-etiqueta-form',
    templateUrl: './cdk-regra-etiqueta-form.component.html',
    styleUrls: ['./cdk-regra-etiqueta-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRegraEtiquetaFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    regraEtiqueta: RegraEtiqueta;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<RegraEtiqueta>();

    @Output()
    abort = new EventEmitter<any>();

    showFormCriteria = false;

    form: FormGroup;

    activeCard = 'form';

    criterias: Criteria[];

    @Input()
    especieCriteriaList: Criteria[];

    @Input()
    setorRecebidoPagination: Pagination;

    @Input()
    unidadeRecebidaPagination: Pagination;

    @Input()
    usuarioRecebidoPagination: Pagination;

    @Input()
    assuntoAdministrativoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            nome: [null, [Validators.required]],
            etiqueta: [null],
            descricao: [null],
            criterias: [null, [Validators.required]]
        });

        this.especieCriteriaList = [];
        this.criterias = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnInit(): void {
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['regra'] && this.regraEtiqueta && ((!this.regraEtiqueta.id && !this.form.dirty))) {
            this.form.patchValue({...this.regraEtiqueta});
        }

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
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doCreateCriteria(): void {
        this.showFormCriteria = true;
    }

    cancelFormCriteria(): void {
        this.showFormCriteria = false;
    }

    submitCriteria(criteria: Criteria): void {
        const findDuplicate = this.criterias.some(item => (item.id === criteria.id) && (item.valor === criteria.valor));
        if (!findDuplicate) {
            this.criterias.push(criteria);
            this.form.get('criterias').setValue(this.criterias);
        }
        this.cancelFormCriteria();
    }
}
