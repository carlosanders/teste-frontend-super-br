import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation,
    Input
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/oficios/store';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {modulesConfig} from "../../../../../../modules/modules-config";

@Component({
    selector: 'documento-avulso-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    links: any;

    mode = 'entrada';

    routerState: any;

    @Input()
    pessoasConveniadas: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
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
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (routerState.state.params['targetHandle'] === 'entrada') {
                    this.mode = 'entrada';
                } else {
                    this.mode = 'saida';
                }
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    onDrop($event): void {

    }
}
