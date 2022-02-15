import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/oficios/store';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'documento-avulso-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    mode = 'entrada';
    routerState: any;
    @Input()
    pessoasConveniadas: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        const path = 'app/main/apps/oficios/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (routerState.state.params['targetHandle'] === 'entrada') {
                this.mode = 'entrada';
            } else {
                this.mode = 'saida';
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    onDrop($event): void {

    }

    fecharSidebar() {
        if (!this._cdkSidebarService.getSidebar('documento-avulso-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('documento-avulso-main-sidebar').close();
        }
    }
}
