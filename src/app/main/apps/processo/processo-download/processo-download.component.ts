import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';
import {Processo} from '@cdk/models/processo.model';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStoreProcesso from '../store';
import * as fromStoreDownload from './store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'processo-download',
    templateUrl: './processo-download.component.html',
    styleUrls: ['./processo-download.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoDownloadComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;

    loading$: Observable<boolean>;
    routerState: any;

    saving$: Observable<boolean>;

    /**
     *
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param _storeProcesso
     * @param _storeDownload
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private _storeProcesso: Store<fromStoreProcesso.ProcessoAppState>,
        private _storeDownload: Store<fromStoreDownload.ProcessoDownloadAppState>,
        private _router: Router
    ) {
        // Set the defaults
        this.processo$ = this._storeProcesso.pipe(select(fromStoreProcesso.getProcesso));
        this.loading$ = this._storeProcesso.pipe(select(fromStoreProcesso.getProcessoIsLoading));

        this.saving$ = this._storeDownload.pipe(select(fromStoreDownload.getIsSaving));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._storeProcesso
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    submitDownload(values): void {

        let sequencial = '';
        if (values['parcial'])
        {
            sequencial = values['sequencial'];
        }

        if (values['tipo_download'] === 'processo_zip') {
            this._storeDownload.dispatch(new fromStoreDownload.DownloadAsZipProcesso(sequencial));
        } else {
            this._storeDownload.dispatch(new fromStoreDownload.DownloadAsPdfProcesso(sequencial));
        }

    }

}
