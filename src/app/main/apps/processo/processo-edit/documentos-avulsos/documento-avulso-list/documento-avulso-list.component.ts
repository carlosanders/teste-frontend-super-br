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
import {Documento, DocumentoAvulso} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from "../../../../../../../modules/modules-config";
import {TableDefinitions} from "../../../../../../../@cdk/components/table-definitions/table-definitions";
import {
    TableDefinitionsService
} from "@cdk/components/table-definitions/table-definitions.service";
import {
    CdkDocumentoAvulsoGridColumns
} from "@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid.columns";

@Component({
    selector: 'documento-avulso-list',
    templateUrl: './documento-avulso-list.component.html',
    styleUrls: ['./documento-avulso-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoListComponent implements OnInit, OnDestroy {

    routerState: any;
    documentosAvulsos$: Observable<DocumentoAvulso[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    tableDefinitions: TableDefinitions = new TableDefinitions();

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['DocumentoAvulsoListComponent', 'CdkDocumentoAvulsoGrid'];

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _activatedRoute
     * @param _tableDefinitionsService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.DocumentoAvulsoListAppState>,
        private _activatedRoute: ActivatedRoute,
        private _tableDefinitionsService: TableDefinitionsService,
    ) {
        this.documentosAvulsos$ = this._store.pipe(select(fromStore.getDocumentoAvulsoList));
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
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this._tableDefinitionsService
            .getTableDefinitions(
                this._tableDefinitionsService
                    .generateTableDeinitionIdentifier(DocumentoAvulsoListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((definitions: TableDefinitions) => {
                if (!definitions) {
                    this.tableDefinitions = new TableDefinitions();
                    this.tableDefinitions.version = CdkDocumentoAvulsoGridColumns.version;
                } else {
                    this.tableDefinitions = definitions;
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {

        let contexto = params.context ? params.context : {};
        const modulos = [];
        modulesConfig.forEach((module) => {
            modulos.push(module.name);
        });
        contexto['modulo'] = modulos;

        this._store.dispatch(new fromStore.GetDocumentosAvulsos({
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
            context: contexto,
            populate: this.pagination.populate
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetDocumentosAvulsos({
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

    edit(documentoAvulsoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + documentoAvulsoId]).then();
    }

    delete(documentoAvulsoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoAvulso({
            documentoAvulsoId: documentoAvulsoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    responder(documentoAvulsoId: number[]): void {
        const oficioId = documentoAvulsoId[0];
        this._router.navigate([this.routerState.url.replace('listar', 'responder/') + oficioId]).then();
    }

    verificaStatusBarramento(documentoAvulsoId: number[]): void {
        this._router.navigate([
            this.routerState.url.replace('listar', 'status-barramento-oficio/') +
            documentoAvulsoId
        ]).then();
    }

    visualizar(documentoAvulso: DocumentoAvulso): void {
        const sidebar = 'oficio/dados-basicos';
        this._router.navigate([
                this.routerState.url +
                '/documento/' + documentoAvulso.documentoRemessa.id,
                {
                    outlets: {
                        sidebar: sidebar
                    }
                }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }

    visualizarDocumento(documento: Documento): void {
        const sidebar = 'editar/dados-basicos';

        this._router.navigate([
                this.routerState.url +
                '/documento/' + documento.id,
                {
                    outlets: {
                        sidebar: sidebar
                    }
                }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetDocumentosAvulsos(this.pagination));
    }

    doTableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        tableDefinitions.identifier = this._tableDefinitionsService
            .generateTableDeinitionIdentifier(DocumentoAvulsoListComponent.GRID_DEFINITIONS_KEYS);

        this._tableDefinitionsService.saveTableDefinitions(tableDefinitions);
    }

    doResetTableDefinitions(): void {
        this.reload({
            ...this.pagination,
            sort: {},
            limit: 10
        });
    }
}
