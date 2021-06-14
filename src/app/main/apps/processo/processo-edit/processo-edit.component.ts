import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import {getProcesso, getSteps} from '../store';
import {getRouterState} from '../../../../store';
import {Observable} from 'rxjs';
import {Processo} from '../../../../../@cdk/models';
import {MercureService} from '../../../../../@cdk/services/mercure.service';

@Component({
    selector: 'processo-edit',
    templateUrl: './processo-edit.component.html',
    styleUrls: ['./processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoEditComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;

    routerState: any;
    steps: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     * @param _mercureService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ProcessoAppState>,
        private _mercureService: MercureService
    ) {
        this.processo$ = this._store.pipe(select(getProcesso));
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
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
                this.refresh();
            }
        });

        this._store
            .pipe(
                select(getSteps)
            ).subscribe((steps) => {
                if (steps) {
                    this.steps = steps;
                }
            });

        this.processo$.subscribe(
            (processo) => {
                if (this.processo && processo && (this.processo.id !== processo.id) && this.processo.origemDados) {
                    this._mercureService.unsubscribe(this.processo.origemDados['@id']);
                }
                if (processo?.origemDados) {
                    this._mercureService.subscribe(processo.origemDados['@id']);
                }
                this.processo = processo;
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
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
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }
}
