import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-campo-grid-filter',
    templateUrl: './cdk-campo-grid-filter.component.html',
    styleUrls: ['./cdk-campo-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCampoGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            nome: [null],
            descricao: [null],
            html: [null],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('nome').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                nome: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                descricao: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('html').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                html: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

    }

}
