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
import {Pagination, VinculacaoRole} from '@cdk/models';

@Component({
    selector: 'cdk-visibilidade-role-form',
    templateUrl: './cdk-visibilidade-role-form.component.html',
    styleUrls: ['./cdk-visibilidade-role-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVisibilidadeRoleFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    visibilidadeRole: VinculacaoRole;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<VinculacaoRole>();

    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    roleVinculadoPagination: Pagination;

    @Input()
    staticRoles: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            role: [null],
        });

        this.roleVinculadoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['visibilidadeRole'] && this.visibilidadeRole && ((!this.visibilidadeRole.id && !this.form.dirty)
            || (this.visibilidadeRole.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.visibilidadeRole});
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

    checkVinculacaoRoleVinculado(): void {
        const value = this.form.get('roleVinculado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('roleVinculado').setValue(null);
        }
    }

    selectVinculacaoRoleVinculado(roleVinculado: VinculacaoRole): void {
        if (roleVinculado) {
            this.form.get('roleVinculado').setValue(roleVinculado);
        }
        this.activeCard = 'form';
    }

    showVinculacaoRoleVinculadoGrid(): void {
        this.activeCard = 'role-vinculado-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
