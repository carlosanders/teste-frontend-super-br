import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {Colaborador, Coordenador} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {Lotacao, Setor, Usuario} from '@cdk/models';
import {modulesConfig} from '../../../../../../modules/modules-config';

@Component({
    selector: 'arquivista-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();


    mode = 'Arquivista';

    routerState: any;

    unidadeHandle = '';
    typeHandle = '';

    setoresCoordenacao: Setor[] = [];

    usuariosAssessor: Usuario[] = [];

    colaborador: Colaborador;
    unidades: Setor[] = [];
    links: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ArquivistaAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _loginService: LoginService
    ) {

        this.colaborador = this._loginService.getUserProfile().colaborador;
        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.unidades.includes(lotacao.setor.unidade) && lotacao.arquivista === true) {
                this.unidades.push(lotacao.setor.unidade);
            }
        });

        this.links = [
            {
                nome: 'Pronto para Transição',
                icon: 'check_circle',
                link: 'pronto-transicao'
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

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;

                if (routerState.state.params['unidadeHandle']) {
                    this.unidadeHandle = routerState.state.params['unidadeHandle'];
                }


                if (routerState.state.params['typeHandle']) {
                    this.typeHandle = routerState.state.params['typeHandle'];
                }
                else{
                    this.typeHandle = 'pronto-transicao';
                }

                this.typeHandle = routerState.state.params['typeHandle'];
            }
        });

        this.setoresCoordenacao = [];

        this._loginService.getUserProfile().coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.setor) {
                this.setoresCoordenacao.push(coordenador.setor);
            }
        });

        this.usuariosAssessor = [];

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
