import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../store/reducers';

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

    animationDirection: 'left' | 'right' | 'none';

    routerState: any;

    links: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     * @param _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.UnidadesOrgaoCentralAppState>,
        private _router: Router
    ) {

        // Set the defaults
        this.animationDirection = 'none';

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
