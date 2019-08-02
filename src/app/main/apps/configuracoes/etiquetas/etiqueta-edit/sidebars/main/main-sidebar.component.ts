import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'etiqueta-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class EtiquetaEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.State>) {

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
                'nome': 'Dados Básicos',
                'link': 'dados-basicos'
            },
            {
                'nome': 'Ações',
                'link': 'acoes'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
