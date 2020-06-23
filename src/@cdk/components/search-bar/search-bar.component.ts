import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CdkConfigService } from '@cdk/services/config.service';

@Component({
    selector   : 'cdk-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class CdkSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    cdkConfig: any;

    @Output()
    inputText: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CdkConfigService} _cdkConfigService
     */
    constructor(
        private _cdkConfigService: CdkConfigService
    )
    {
        // Set the defaults
        this.inputText = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.cdkConfig = config;
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        if (event.target.value && event.target.value.length > 5) {
            this.inputText.emit(event.target.value);
        }
    }

}
