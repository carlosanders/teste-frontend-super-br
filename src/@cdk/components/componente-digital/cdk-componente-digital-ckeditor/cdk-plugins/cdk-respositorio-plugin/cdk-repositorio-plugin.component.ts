import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {Pagination, Repositorio} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';

@Component({
    selector: 'cdk-repositorio-plugin',
    templateUrl: './cdk-repositorio-plugin.component.html',
    styleUrls: ['./cdk-repositorio-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRepositorioPluginComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    repositorios: Repositorio[];

    total = 0;

    loading: boolean;

    form: FormGroup;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkRepositorioPluginComponent>,
    ) {
        this.loading = false;
        this.pagination = new Pagination();

        this.form = this._formBuilder.group({
            repositorio: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
    }

    select(repositorio): void {
        this.selected.emit(repositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

    checkRepositorio(): void {
        const value = this.form.get('repositorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('repositorio').setValue(null);
        }
    }

}
