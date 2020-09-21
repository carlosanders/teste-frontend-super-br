import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../dados-pessoa-edit/store';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {cdkAnimations} from '../../../../../../../@cdk/animations';

@Component({
    selector: 'pessoa-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PessoaEditMainSidebarComponent implements OnInit, OnDestroy {

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    links: any;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>,
    ) {
        this.pessoa$ = this._store.pipe(select(fromStore.getPessoa));
        const path = 'app/main/apps/pessoa/pessoa-edit/sidebars/main';

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
                nome: 'Dados Básicos',
                link: 'dados-pessoa'
            },
            {
                nome: 'Documentos',
                link: 'documentos',
                pessoa: true
            },
            {
                nome: 'Endereços',
                link: 'enderecos',
                pessoa: true
            },
            {
                nome: 'Relacionamentos',
                link: 'relacionamentos',
                pessoa: true
            },
            {
                nome: 'Outros Nomes',
                link: 'nomes',
                pessoa: true
            }
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

}
