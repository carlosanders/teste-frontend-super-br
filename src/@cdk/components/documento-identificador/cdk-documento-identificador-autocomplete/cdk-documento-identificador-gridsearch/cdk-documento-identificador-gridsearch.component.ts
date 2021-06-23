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

import {DocumentoIdentificador, Pagination} from '@cdk/models';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';

@Component({
    selector: 'cdk-documento-identificador-gridsearch',
    templateUrl: './cdk-documento-identificador-gridsearch.component.html',
    styleUrls: ['./cdk-documento-identificador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoIdentificadorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    documentoIdentificadors: DocumentoIdentificador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _documentoIdentificadorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _documentoIdentificadorService: DocumentoIdentificadorService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._documentoIdentificadorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.documentoIdentificadors = response['entities'];
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

    select(documentoIdentificador): void {
        this.selected.emit(documentoIdentificador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
