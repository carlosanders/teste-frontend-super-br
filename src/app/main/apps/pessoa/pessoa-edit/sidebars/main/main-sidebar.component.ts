import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../dados-pessoa-edit/store';

@Component({
    selector: 'pessoa-edit-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class PessoaEditMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    links: any;

    /**
     * @param _changeDetectorRef
     * @param _fuseSidebarService
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>,
    ) {
        this.pessoa$ = this._store.pipe(select(fromStore.getPessoa));
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
