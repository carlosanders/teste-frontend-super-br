import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {ModalidadeVinculacaoDocumento} from '@cdk/models/modalidade-vinculacao-documento.model';

@Component({
    selector: 'cdk-modalidade-vinculacao-documento-gridsearch',
    templateUrl: './cdk-modalidade-vinculacao-documento-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-documento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeVinculacaoDocumentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadevinculacaoDocumentos: ModalidadeVinculacaoDocumento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadevinculacaoDocumentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeVinculacaoDocumentoService: ModalidadeVinculacaoDocumentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeVinculacaoDocumentoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadevinculacaoDocumentos = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(modalidadevinculacaoDocumento): void {
        this.selected.emit(modalidadevinculacaoDocumento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
