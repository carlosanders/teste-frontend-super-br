import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Processo} from '@cdk/models';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStoreProcesso from '../store';
import * as fromStoreDownload from './store';
import {Router} from '@angular/router';
import {Back, getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'processo-download',
    templateUrl: './processo-download.component.html',
    styleUrls: ['./processo-download.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoDownloadComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    errors: any;

    loading$: Observable<boolean>;
    routerState: any;

    saving$: Observable<boolean>;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _storeProcesso
     * @param _storeDownload
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _storeProcesso: Store<fromStoreProcesso.ProcessoAppState>,
        private _storeDownload: Store<fromStoreDownload.ProcessoDownloadAppState>,
        private _router: Router
    ) {
        // Set the defaults
        this.processo$ = this._storeProcesso.pipe(select(fromStoreProcesso.getProcesso));
        this.loading$ = this._storeProcesso.pipe(select(fromStoreProcesso.getProcessoIsLoading));

        this.saving$ = this._storeDownload.pipe(select(fromStoreDownload.getIsSaving));
        this._storeProcesso.pipe(
            select(fromStoreDownload.getErrors),
            takeUntil(this._unsubscribeAll)
        ).subscribe(errors => this.errors = errors);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._storeProcesso.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((processo) => {
            this.processo = processo;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    abort(): void {
        this._storeProcesso.dispatch(new Back());
    }

    submitDownload(values): void {
        const params = {
            sequencial: '',
            tipoDownload: 'PDF'
        };
        if (values['parcial']) {
            params.sequencial = values['sequencial'];
        }

        if (values['tipo_download'] === 'processo_zip') {
            params.tipoDownload = 'ZIP';
        }

        this._storeDownload.dispatch(new fromStoreDownload.DownloadProcesso(params));
    }

}
