import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-logentry-grid-filter',
    templateUrl: './cdk-logentry-grid-filter.component.html',
    styleUrls: ['./cdk-logentry-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkLogentryGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = '{}';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            action: [null],
            objectId: [null],
            loggedAt: [null],
            objectClass: [null],
            valor: [null],
            username: [null],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('action').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    action: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('objectId').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    objectId: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('loggedAt').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    loggedAt: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('objectClass').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    objectClass: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('valor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    valor: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('username').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    username: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('loggedAt').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    loggedAt: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });
    }

}
