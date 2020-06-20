import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../classificacao-list/store';
import {getRouterState} from 'app/store/reducers';

import {modulesConfig} from 'modules/modules-config';

@Component({
    selector: 'classificacao-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class ClassificacaoMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.ClassificacaoListAppState>) {
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

        const path = 'app/main/apps/admin/classificacao/sidebars/main';

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
