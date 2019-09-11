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

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {Processo} from '@cdk/models/processo.model';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromStore from 'app/main/apps/processo/store';

import {locale as english} from 'app/main/apps/processo/i18n/en';
import {fuseAnimations} from '@fuse/animations';
import {getRouterState} from '../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {DownloadAsPdfProcesso} from 'app/main/apps/processo/store';

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
    routerState: any;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Store<ProcessoAppState>} _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _store: Store<fromStore.ProcessoAppState>
    ) {
        // Set the defaults
        this._fuseTranslationLoaderService.loadTranslations(english);
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
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
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

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    downloadAsPdf(): void {
        this._store.dispatch(new DownloadAsPdfProcesso());
    }

}
