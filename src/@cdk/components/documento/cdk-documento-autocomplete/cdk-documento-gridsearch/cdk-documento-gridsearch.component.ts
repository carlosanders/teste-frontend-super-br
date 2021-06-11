import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Documento, Pagination} from '@cdk/models';

import {DocumentoService} from '@cdk/services/documento.service';

@Component({
    selector: 'cdk-documento-gridsearch',
    templateUrl: './cdk-documento-gridsearch.component.html',
    styleUrls: ['./cdk-documento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    displayedColumns = ['id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    documentos: Documento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _documentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _documentoService: DocumentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._documentoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.documentos = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

   reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    select(documento): void {
        this.selected.emit(documento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
