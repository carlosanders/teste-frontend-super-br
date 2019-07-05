import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {DocumentoIdentificador} from '@cdk/models/documento-identificador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'documento-identificador-list',
    templateUrl: './documento-identificador-list.component.html',
    styleUrls: ['./documento-identificador-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoIdentificadorListComponent implements OnInit {

    routerState: any;
    documentoIdentificador$: Observable<DocumentoIdentificador[]>;
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
        private _store: Store<fromStore.DocumentoIdentificadorListAppState>,
    ) {
        this.documentoIdentificador$ = this._store.pipe(select(fromStore.getDocumentoIdentificadorList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
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
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetDocumentoIdentificador({
            ...this.pagination,
            gridFilter: params.gridFilter
        }));
    }

    edit(documentoIdentificadorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + documentoIdentificadorId]);
    }

    delete(documentoIdentificadorId: number): void {
        this._store.dispatch(new fromStore.DeleteDocumentoIdentificador(documentoIdentificadorId));
    }

}