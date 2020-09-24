import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../assunto-administrativo-list/store';
import {getRouterState} from 'app/store/reducers';

import {modulesConfig} from 'modules/modules-config';
import {cdkAnimations} from '../../../../../../../@cdk/animations';

@Component({
    selector: 'assunto-administrativo-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AssuntoAdministrativoMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.AssuntoAdministrativoListAppState>) {
    }

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


        this.links = [
            {
                nome: 'Listar',
                link: 'listar',
                icon: 'view_column'
            },
            {
                nome: 'Árvore',
                link: 'arvore',
                icon: 'clear_all'
            }
        ];

        const path = 'app/main/apps/admin/assunto-administrativo/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
