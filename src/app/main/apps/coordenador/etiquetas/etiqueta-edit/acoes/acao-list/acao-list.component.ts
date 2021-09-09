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
import {Acao, Etiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Component({
    selector: 'acao-list',
    templateUrl: './acao-list.component.html',
    styleUrls: ['./acao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoListComponent implements OnInit, OnDestroy {

    routerState: any;
    acoes$: Observable<Acao[]>;
    acoes: Acao[] = [];
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.AcaoListAppState>,
    ) {
        this.acoes$ = this._store.pipe(select(fromStore.getAcaoList));
        this.etiqueta$ = this._store.pipe(select(fromStore.getEtiqueta));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.etiqueta$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(acoes => !!acoes)
        ).subscribe((etiqueta) => {
            this.etiqueta = etiqueta;
        });
        this.acoes$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(acoes => !!acoes)
        ).subscribe((acoes) => {
            this.acoes = acoes;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    reload(params): void {
        this._store.dispatch(new fromStore.GetAcoes(params));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetAcoes({
            filter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            context: params.context
        }));
    }

    delete(acaoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteAcao({
            acaoId: acaoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }
}
