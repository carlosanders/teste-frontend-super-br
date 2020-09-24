import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from 'app/store/reducers';
import {modulesConfig} from '../../../../../../../../modules/modules-config';
import {cdkAnimations} from '../../../../../../../../@cdk/animations';

@Component({
    selector: 'etiqueta-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EtiquetaEditMainSidebarComponent implements OnInit, OnDestroy {

    links: any;
    routerState: any;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    constructor(private _store: Store<fromStore.State>) {
        const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/sidebars/main';

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
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.links = [
            {
                nome: 'Dados Básicos',
                link: 'dados-basicos'
            },
            {
                nome: 'Ações',
                link: 'acoes'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
