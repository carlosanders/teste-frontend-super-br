import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {Colaborador, Lotacao, Setor} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'arquivista-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaMainSidebarComponent implements OnInit, OnDestroy {

    mode = 'Arquivista';
    routerState: any;
    unidadeHandle = '';
    typeHandle = '';
    colaborador: Colaborador;
    setores: Setor[] = [];
    links: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     * @param _cdkSidebarService
     */
    constructor(
        private _store: Store<fromStore.ArquivistaAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {

        this.colaborador = this._loginService.getUserProfile().colaborador;
        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.setores.includes(lotacao.setor) && lotacao.arquivista === true) {
                this.setores.push(lotacao.setor);
            }
        });

        this.links = [
            {
                nome: 'Pronto para Transferência',
                icon: 'check_circle',
                link: 'pronto-transferencia'
            },
            {
                nome: 'Pronto para Eliminação',
                icon: 'check_circle',
                link: 'pronto-eliminacao'
            },
            {
                nome: 'Pronto para Recolhimento',
                icon: 'check_circle',
                link: 'pronto-recolhimento'
            },
            {
                nome: 'Aguardando Decurso',
                icon: 'hourglass_empty',
                link: 'aguardando-decurso'
            },
            {
                nome: 'Pendência de Análise',
                icon: 'error_outline',
                link: 'pendencia-analise'
            }
        ];
        const path = 'app/main/apps/arquivista/sidebars/main';

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
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            if (routerState.state.params['unidadeHandle']) {
                this.unidadeHandle = routerState.state.params['unidadeHandle'];
            }

            this.typeHandle = routerState.state.params['typeHandle'] ?? 'pronto-transferencia';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('arquivista-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('arquivista-main-sidebar').close();
        }
    }
}
