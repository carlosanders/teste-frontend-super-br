import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {RegraEtiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'regra-etiqueta-list',
    templateUrl: './regra-etiqueta-list.component.html',
    styleUrls: ['./regra-etiqueta-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegraEtiquetaListComponent implements OnInit {

    routerState: any;
    regrasEtiqueta$: Observable<RegraEtiqueta[]>;
    regrasEtiqueta: RegraEtiqueta[] = [];
    loading$: Observable<boolean>;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RegraEtiquetaListAppState>,
    ) {
        this.regrasEtiqueta$ = this._store.pipe(select(fromStore.getRegraEtiquetaList));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.regrasEtiqueta$.pipe(
            filter(regrasEtiqueta => !!regrasEtiqueta)
        ).subscribe(
            regrasEtiqueta => this.regrasEtiqueta = regrasEtiqueta
        );
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetRegrasEtiqueta(params));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetRegrasEtiqueta({
            filter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            context: params.context
        }));
    }

    delete(regraEtiquetaId: number): void {
        this._store.dispatch(new fromStore.DeleteRegraEtiqueta(regraEtiquetaId));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}