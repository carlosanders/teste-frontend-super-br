import {
    ChangeDetectionStrategy,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    Component,
    Output,
    Input
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-logentry-filter',
    templateUrl: './cdk-logentry-filter.component.html',
    styleUrls: ['./cdk-logentry-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLogentryFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';

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
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({action: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('action')) {
                    delete this.filters['action'];
                }
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
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({objectClass: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('objectClass')) {
                    delete this.filters['objectClass'];
                }
            }
        });

        this.form.get('valor').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({valor: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('valor')) {
                    delete this.filters['valor'];
                }
            }
        });

        this.form.get('username').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({username: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('username')) {
                    delete this.filters['username'];
                }
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
        this._cdkSidebarService.getSidebar('cdk-logentry-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
    }
}
