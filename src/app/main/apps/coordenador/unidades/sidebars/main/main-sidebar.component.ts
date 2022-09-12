import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'unidades-orgao-central-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));

        this.orgaoCentral$.pipe(filter(orgaoCentral => !!orgaoCentral)).subscribe(
            (orgaoCentral) => {
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
                nome: 'Etiquetas da Unidade',
                icon: 'label',
                link: 'etiquetas'
            },
            {
                nome: 'Usuários da Unidade',
                icon: 'person',
                link: 'usuarios'
            },
            {
                nome: 'Setores da Unidade',
                icon: 'domain',
                link: 'setor'
            },
            {
                nome: 'Avisos da Unidade',
                icon: 'info',
                link: 'avisos'
            }
        ];

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        const path = 'app/main/apps/coordenador/unidades/sidebars/main';

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
