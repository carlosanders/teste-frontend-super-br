import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Processo} from '@cdk/models/processo.model';
import * as fromStore from './store';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    loading$: Observable<boolean>;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {Store<ProcessoAppState>} _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.ProcessoAppState>
    ) {
        // Set the defaults
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.loading$ = this._store.pipe(select(fromStore.getProcessoIsLoading));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }
}
