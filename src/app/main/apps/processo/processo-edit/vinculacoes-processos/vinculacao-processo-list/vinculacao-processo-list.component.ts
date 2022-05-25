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
import {Processo, VinculacaoProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'vinculacao-processo-list',
    templateUrl: './vinculacao-processo-list.component.html',
    styleUrls: ['./vinculacao-processo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoProcessoListComponent implements OnInit, OnDestroy {

    routerState: any;
    vinculacoesProcessos$: Observable<VinculacaoProcesso[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    currentProcessoId: number;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VinculacaoProcessoListAppState>,
    ) {
        this.vinculacoesProcessos$ = this._store.pipe(select(fromStore.getVinculacaoProcessoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.currentProcessoId = this.routerState.params['processoHandle'] || null;
        });
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
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            ...this.pagination,
            processoId: this.routerState.params['processoHandle'],
            sort: params.sort,
            populate: this.pagination.populate
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            ...this.pagination,
            processoId: this.routerState.params['processoHandle'],
            sort: params.sort,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    edit(vinculacaoProcessoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoProcessoId]).then();
    }

    delete(vinculacaoProcessoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVinculacaoProcesso({
            vinculacaoProcessoId: vinculacaoProcessoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    visualizarProcesso(processo: Processo): void {
        const chaveAcesso = processo.chaveAcesso ? '/chave/' + processo.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + processo.id + chaveAcesso + '/visualizar']).then();
    }

    visualizarProcessoNovaAba(processo: Processo): void {
        const chaveAcesso = processo.chaveAcesso ? '/chave/' + processo.chaveAcesso : '';
        window.open('apps/processo/' + processo.id + chaveAcesso + '/visualizar', '_blank');
    }
}
