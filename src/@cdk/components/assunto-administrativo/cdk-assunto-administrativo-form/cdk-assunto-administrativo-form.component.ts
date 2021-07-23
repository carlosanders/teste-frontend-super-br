import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {AssuntoAdministrativo, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-assunto-administrativo-form',
    templateUrl: './cdk-assunto-administrativo-form.component.html',
    styleUrls: ['./cdk-assunto-administrativo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoAdministrativoFormComponent implements OnChanges, OnDestroy {

    @Input()
    assuntoAdministrativo: AssuntoAdministrativo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    assuntoAdministrativoPagination: Pagination;

    @Input()
    form: FormGroup;

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            parent: [null],
            dispositivoLegal: [null, [Validators.maxLength(255)]],
            codigoCNJ: [null, [Validators.minLength(3), Validators.maxLength(25)]],
            glossario: [null, [Validators.maxLength(255)]],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['assuntoAdministrativo'] && this.assuntoAdministrativo && ((!this.assuntoAdministrativo.id && !this.form.dirty) || (this.assuntoAdministrativo.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.assuntoAdministrativo.id,
                nome: this.assuntoAdministrativo.nome,
                parent: this.assuntoAdministrativo.parent,
                dispositivoLegal: this.assuntoAdministrativo.dispositivoLegal,
                codigoCNJ: this.assuntoAdministrativo.codigoCNJ,
                glossario: this.assuntoAdministrativo.glossario,
                ativo: this.assuntoAdministrativo.ativo
            });
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

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    showAssuntoAdministrativoGrid(): void {
        this.activeCard = 'assunto-administrativo-gridsearch';
    }

    selectAssuntoAdministrativo(parent: AssuntoAdministrativo): void {
        if (parent) {
            this.form.get('parent').setValue(parent);
        }
        this.activeCard = 'form';
    }
}
