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
import {Visibilidade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'visibilidade-list',
    templateUrl: './visibilidade-list.component.html',
    styleUrls: ['./visibilidade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadeListComponent implements OnInit {

    routerState: any;
    visibilidades$: Observable<Visibilidade[]>;
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VisibilidadeListAppState>,
    ) {
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
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
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVisibilidades(params));
    }


    excluded(params): void {
        this._store.dispatch(new fromStore.GetVisibilidades({
            filter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            context: params.context
        }));
    }

    delete(visibilidadeId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVisibilidade({
            visibilidadeId: visibilidadeId,
            operacaoId: operacaoId,
            loteId: loteId,
            tipoRelatorioId: this.routerState.params['tipoRelatorioHandle']
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    criarVisibilidade(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar')]).then();
    }
}
