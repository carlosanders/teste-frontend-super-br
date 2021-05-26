import {Component, OnInit} from '@angular/core';
import {Setor} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {modulesConfig} from '../../../../../../../modules/modules-config';

@Component({
    selector: 'setor-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss']
})
export class SetorMainSidebarComponent implements OnInit {

    unidade$: Observable<Setor>;
    unidade: Setor;
    setor$: Observable<Setor>;

    routerState: any;
    links: any;

    baseLink = '';

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.CoordenadorSetorAppState>,
        private _router: Router
    ) {

        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));

        this.unidade$.subscribe(
            (setor) => {
                this.unidade = setor;
            }
        );

        this.links = [
            {
                nome: 'Modelos do Setor',
                icon: 'file_copy',
                link: 'modelos'
            },
            {
                nome: 'Teses do Setor',
                icon: 'add_comment',
                link: 'repositorios'
            },
            {
                nome: 'Etiquetas do Setor',
                icon: 'label',
                link: 'etiquetas'
            },
            {
                nome: 'Usuários do Setor',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Avisos do Setor',
                icon: 'info',
                link: 'avisos'
            }
        ];

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
                this.baseLink = '/apps/coordenador/' + this.routerState.params['generoHandle'] + '/' +
                    this.routerState.params['entidadeHandle'];
                if (this.routerState.params['unidadeHandle']) {
                    this.baseLink += '/unidades/' + this.routerState.params['unidadeHandle'];
                }
                this.baseLink += '/setor/' + this.routerState.params['setorHandle'];
            }
        });

        const path = 'app/main/apps/coordenador/setor/sidebars/main';

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
    }
}
