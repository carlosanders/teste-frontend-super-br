import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, Processo, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/processos/store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {
    SearchBarEtiquetasFiltro
} from "../../../../../@cdk/components/search-bar-etiquetas/search-bar-etiquetas-filtro";

@Component({
    selector: 'processos',
    templateUrl: './processos.component.html',
    styleUrls: ['./processos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessosComponent implements OnInit, OnDestroy {

    routerState: any;
    processos$: Observable<Processo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NUPHandle: any;
    colunas: any[] = ['id', 'NUP', 'actions'];

    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];
    filtroEtiquetas: SearchBarEtiquetasFiltro;
    vinculacaoEtiquetaPagination: Pagination;

    mobileMode: boolean;
    private _profile: any;
    private screen$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ProcessosAppState>,
        public _loginService: LoginService,
    ) {
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this._profile = _loginService.getUserProfile();
        this.screen$ = this._store.pipe(select(getScreenState));

        if (_loginService.isGranted('ROLE_COLABORADOR')) {
            this.colunas = ['select', 'id', 'NUP', 'especieProcesso.nome', 'setorAtual.nome', 'unidade', 'actions'];
        }

        const vinculacaoEtiquetaPagination = new Pagination();
        vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador?.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'sistema': 'eq:true',
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                }
            ]
        };
        this.arrayFiltrosEtiquetas.push({
            label: 'etiquetas do processo',
            pagination: vinculacaoEtiquetaPagination,
            queryFilter: 'vinculacoesEtiquetas.etiqueta.id'
        });
        this.filtroEtiquetas = this.arrayFiltrosEtiquetas[0];
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.NUPHandle = this.routerState.params.NUPHandle;
            if (this.routerState.params.NUPHandle) {
                this.reload({
                    ...this.pagination,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    gridFilter: {NUP: 'like:' + this.routerState.params.NUPHandle + '%'}
                });
            }
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetProcessos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: {
                ...params.context
            }
        }));
    }

    view(emissao: { id: number; chaveAcesso?: string }): void {
        const chaveAcesso = emissao.chaveAcesso ? '/chave/' + emissao.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + emissao.id + chaveAcesso + '/visualizar']).then();
    }

    edit(processoId: number): void {
        this._router.navigate(['apps/processo/' + processoId + '/editar']).then();
    }

    protocoloExistente(processoId: number): void {
        this._router.navigate(['apps/pesquisa/protocolo-existente/' + processoId]).then();
    }
}
