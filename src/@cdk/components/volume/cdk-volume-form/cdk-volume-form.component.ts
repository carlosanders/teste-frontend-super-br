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
import {ModalidadeMeio, Pagination, Volume} from '@cdk/models';

@Component({
    selector: 'cdk-volume-form',
    templateUrl: './cdk-volume-form.component.html',
    styleUrls: ['./cdk-volume-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVolumeFormComponent implements OnChanges, OnDestroy {

    @Input()
    volume: Volume;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Volume>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    modalidadeMeioPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

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
            processo: [null, [Validators.required]],
            modalidadeMeio: [null, [Validators.required]],
            numeracaoSequencial: [null],
            encerrado: [null]
        });
        this.modalidadeMeioPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['volume'] && this.volume && ((!this.volume.id && !this.form.dirty) || (this.volume.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.volume});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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

    checkModalidadeMeio(): void {
        const value = this.form.get('modalidadeMeio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeMeio').setValue(null);
        }
    }

    selectModalidadeMeio(modalidadeMeio: ModalidadeMeio): void {
        if (modalidadeMeio) {
            this.form.get('modalidadeMeio').setValue(modalidadeMeio);
        }
        this.activeCard = 'form';
    }

    showModalidadeMeioGrid(): void {
        this.activeCard = 'modalidade-meio-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
