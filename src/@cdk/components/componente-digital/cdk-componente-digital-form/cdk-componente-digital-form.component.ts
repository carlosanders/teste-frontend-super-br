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

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponenteDigital, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-componente-digital-form',
    templateUrl: './cdk-componente-digital-form.component.html',
    styleUrls: ['./cdk-componente-digital-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalFormComponent implements OnChanges, OnDestroy {

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeComponenteDigitalPagination: Pagination;

    @Output()
    save = new EventEmitter<ComponenteDigital>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            numeracaoSequencial: [null, [Validators.required]],
            fileName: [null, [Validators.required, Validators.maxLength(255)]],
            softwareCriacao: [null, [Validators.maxLength(255)]],
            versaoSoftwareCriacao: [null, [Validators.maxLength(255)]],
            extensao: [null],
            tamanho: [null]
        });
        this.modalidadeComponenteDigitalPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['componenteDigital'] && this.componenteDigital &&
            ((!this.componenteDigital.id && !this.form.dirty) || (this.componenteDigital.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.componenteDigital});
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

}
