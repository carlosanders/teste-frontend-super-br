import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {modulesConfig} from "../../../../../../../modules/modules-config";

@Component({
    selector: 'favorito-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class FavoritoEditMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    links: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.FavoritoEditAppState>,
    ) {
        const path = 'app/main/apps/configuracoes/favoritos/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.links = [
            {
                nome: 'Espécie Atividade',
                link: 'favorito-especie-atividade'
            },
            {
                nome: 'Espécie Tarefa',
                link: 'favorito-especie-tarefa'
            },
            {
                nome: 'Setor',
                link: 'favorito-setor-responsavel'
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
