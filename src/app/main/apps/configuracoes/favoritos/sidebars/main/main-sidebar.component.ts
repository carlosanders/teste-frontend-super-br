import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';

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
     * @param _fuseSidebarService
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.FavoritoEditAppState>,
    ) {

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
                nome: 'Setor Responsável',
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
