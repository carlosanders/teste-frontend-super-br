import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {Colaborador} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {Lotacao, Setor, Usuario, VinculacaoUsuario} from '@cdk/models';

@Component({
    selector: 'arquivista-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArquivistaMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();


    mode = 'Arquivista';

    routerState: any;

    unidadeHandle = '';
    typeHandle = '';

    setoresCoordenacao: Setor[] = [];

    usuariosAnalista: Usuario[] = [];

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
            if (!this.unidades.includes(lotacao.setor.unidade)) {
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
                else{
                    this.unidadeHandle = '1';
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

        this._loginService.getUserProfile().colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (lotacao.coordenador) {
                this.setoresCoordenacao.push(lotacao.setor);
            }
        });

        this.usuariosAnalista = [];

        // this._loginService.getUserProfile().vinculacoesUsuariosPrincipais.forEach((vinculacaoUsuario: VinculacaoUsuario) => {
        //     this.usuariosAnalista.push(vinculacaoUsuario.usuario);
        // });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateProcesso());
    }


}
