import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-logentry-grid-filter',
    templateUrl: './cdk-logentry-grid-filter.component.html',
    styleUrls: ['./cdk-logentry-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLogentryGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
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
            }
        });

        this.form.get('objectId').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    objectId: `like:${value}%`
                };
            }
        });

        this.form.get('loggedAt').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    loggedAt: `like:${value}%`
                };
            }
        });

        this.form.get('objectClass').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    objectClass: `like:${value}%`
                };
            }
        });

        this.form.get('valor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    valor: `like:${value}%`
                };
            }
        });

        this.form.get('username').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    username: `like:${value}%`
                };
            }
        });

        this.form.get('loggedAt').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    loggedAt: `eq:${value}`
                };
            }
        });
    }

    emite(): void {
        const request = {
            filters: this.filters
        };
        this.selected.emit(request);
    }

    buscar(): void {
        this.emite();
        this._cdkSidebarService.getSidebar('cdk-logentry-main-sidebar').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this._cdkSidebarService.getSidebar('cdk-logentry-main-sidebar').close();
    }
}
