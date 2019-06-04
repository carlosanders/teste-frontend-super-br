import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Documento} from '@cdk/models/documento.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/documentos/store';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'documentos',
    templateUrl: './documentos.component.html',
    styleUrls: ['./documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentosComponent implements OnInit {

    routerState: any;
    documentos$: Observable<Documento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
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
        private _store: Store<fromStore.DocumentosAppState>,
    ) {
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetDocumentos({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(documentoId: number): void {
        this._router.navigate(['apps/documento/' + documentoId + '/editar']);
    }
}
