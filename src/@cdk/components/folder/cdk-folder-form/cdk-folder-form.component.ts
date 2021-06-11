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
import {Folder, ModalidadeFolder, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-folder-form',
    templateUrl: './cdk-folder-form.component.html',
    styleUrls: ['./cdk-folder-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkFolderFormComponent implements OnChanges, OnDestroy {

    @Input()
    folder: Folder;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Folder>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    modalidadeFolderPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            usuario: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeFolder: [null, [Validators.required]],
        });

        this.modalidadeFolderPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['folder'] && this.folder && (!this.folder.id || (this.folder.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.folder});
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

    checkModalidadeFolder(): void {
        const value = this.form.get('modalidadeFolder').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeFolder').setValue(null);
        }
    }

    selectModalidadeFolder(modalidadefolder: ModalidadeFolder): void {
        if (modalidadefolder) {
            this.form.get('modalidadeFolder').setValue(modalidadefolder);
        }
        this.activeCard = 'form';
    }

    showModalidadeFolderGrid(): void {
        this.activeCard = 'modalidade-folder-gridsearch';
    }

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
