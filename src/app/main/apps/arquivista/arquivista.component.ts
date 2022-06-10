import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import {cdkAnimations} from '@cdk/animations';
import {Colaborador, Etiqueta, Lotacao, Pagination, Setor} from '@cdk/models';
import * as fromStore from './arquivista-list/store';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {Router} from '@angular/router';
import {LoginService} from '../../auth/login/login.service';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '@cdk/models/usuario.model';
import {filter, takeUntil} from 'rxjs/operators';
import {ToggleMaximizado} from '../tarefas/store';
import {getRouterState, getScreenState} from '../../../store';

@Component({
    selector: 'arquivista',
    templateUrl: './arquivista.component.html',
    styleUrls: ['./arquivista.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaComponent implements OnInit, OnDestroy {

    etiquetas: Etiqueta[] = [];
    vinculacaoEtiquetaPagination: Pagination;

    maximizado$: Observable<boolean>;
    maximizado = false;
    mobileMode = false;

    screen$: Observable<any>;

    currentProcessoId: Observable<number[]>;

    pagination$: Observable<any>;
    pagination: any;
    mode = 'Arquivista';
    routerState: any;
    unidadeHandle = '';
    typeHandle = '';
    setoresCoordenacao: Setor[] = [];
    usuariosAssessor: Usuario[] = [];
    colaborador: Colaborador;
    unidades: Setor[] = [];
    links: any;
    private _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _processoService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _processoService: ProcessoService,
        private _router: Router,
        private _store: Store<fromStore.ArquivistaAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            this.unidadeHandle = this.routerState.params['unidadeHandle'];
        });

        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:ARQUIVO'
                }
            ]
        };

        this.colaborador = this._profile.colaborador;
        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.unidades.includes(lotacao.setor) && lotacao.arquivista === true) {
                this.unidades.push(lotacao.setor);
            }
        });
        if (this.unidades.length === 0) {
            this._router.navigate(['apps/painel']).then();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.setoresCoordenacao = [];
        this.usuariosAssessor = [];
        if (!this.routerState.params['unidadeHandle']) {
            this._router.navigate(['apps/arquivista/' + this.getUnidade() + '/pronto-transferencia']).then();
        }

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((maximizado) => {
            this.maximizado = maximizado;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado(false));
                }
            } else {
                this.mobileMode = false;
            }
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getUnidade(): number {
        return this.unidades[0]?.id;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter,
            populate: [
                'especieProcesso',
                'especieProcesso.generoProcesso',
                'modalidadeMeio',
                'modalidadeFase',
                'documentoAvulsoOrigem',
                'classificacao',
                'classificacao.modalidadeDestinacao',
                'setorInicial',
                'setorAtual',
                'lembretes',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta'

            ]
        };
        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

}



