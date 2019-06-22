import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import * as fromStore from '../../pessoa-edit/dados-pessoa-edit/store';
import {Store} from '@ngrx/store';

@Component({
    selector: 'pessoa-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PessoaMainSidebarComponent implements OnInit, OnDestroy {

    links: any;

    /**
     * Constructor
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>
    ) {

        this.links = [
            {
                'nome': 'Pesquisar',
                'icon': 'search',
                'link': 'listar'
            },
            {
                'nome': 'Editar',
                'icon': 'edit',
                'link': 'editar',
                'pessoaHandle': true
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreatePessoa());
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }
}
