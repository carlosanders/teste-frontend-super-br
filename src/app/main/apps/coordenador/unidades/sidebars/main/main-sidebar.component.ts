import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'unidades-orgao-central-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class UnidadesOrgaoCentralMainSidebarComponent implements OnInit {

    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral;
    unidade$: Observable<Setor>;

    routerState: any;
    links: any;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.UnidadesOrgaoCentralAppState>,
        private _router: Router
    ) {

        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));
        this.unidade$ = this._store.pipe(select(fromStore.getSetor));

        this.orgaoCentral$.pipe(filter(orgaoCentral => !!orgaoCentral)).subscribe(
            orgaoCentral => {
                this.orgaoCentral = orgaoCentral;
            }
        );

        this.links = [
            {
                nome: 'Modelos da Unidade',
                icon: 'file_copy',
                link: 'modelos'
            },
            {
                nome: 'Repositórios da Unidade',
                icon: 'add_comment',
                link: 'repositorios'
            },
            {
                nome: 'Usuários da Unidade',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Setores da Unidade',
                icon: 'domain',
                link: 'unidades'
            }
        ];

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
    }
}
