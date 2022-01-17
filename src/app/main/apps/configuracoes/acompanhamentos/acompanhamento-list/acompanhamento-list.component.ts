import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {Compartilhamento, Pagination, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {
    SearchBarEtiquetasFiltro
} from '@cdk/components/search-bar-etiquetas/search-bar-etiquetas-filtro';
import {LoginService} from '../../../../auth/login/login.service';

@Component({
    selector: 'acompanhamento-list',
    templateUrl: './acompanhamento-list.component.html',
    styleUrls: ['./acompanhamento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcompanhamentoListComponent implements OnInit, OnDestroy {

    routerState: any;
    acompanhamentos$: Observable<Compartilhamento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];
    filtroEtiquetas: SearchBarEtiquetasFiltro;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;


    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _loginService
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _loginService: LoginService,
        private _store: Store<fromStore.AcompanhamentoListAppState>,
    ) {
        this.acompanhamentos$ = this._store.pipe(select(fromStore.getAcompanhamentoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
        const vinculacaoEtiquetaProcessoPagination = new Pagination();
        vinculacaoEtiquetaProcessoPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
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
            pagination: vinculacaoEtiquetaProcessoPagination,
            queryFilter: 'processo.vinculacoesEtiquetas.etiqueta.id'
        });
        this.filtroEtiquetas = this.arrayFiltrosEtiquetas[0];
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadAcompanhamentos());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetAcompanhamentos({
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
            populate: this.pagination.populate
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetAcompanhamentos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    edit(acompanhamentoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + acompanhamentoId]).then();
    }

    delete(acompanhamentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteAcompanhamento({
            acompanhamentoId: acompanhamentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    view(emissao: { id: number; chaveAcesso?: string }): void {
        const chaveAcesso = emissao.chaveAcesso ? '/' + emissao.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + emissao.id + '/visualizar' + chaveAcesso]).then();
    }
}
