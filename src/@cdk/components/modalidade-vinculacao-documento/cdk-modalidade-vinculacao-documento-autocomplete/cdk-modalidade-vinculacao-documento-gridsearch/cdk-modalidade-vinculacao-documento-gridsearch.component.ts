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

import {ModalidadeVinculacaoDocumento, Pagination} from '@cdk/models';

import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';

@Component({
    selector: 'cdk-modalidade-vinculacao-documento-gridsearch',
    templateUrl: './cdk-modalidade-vinculacao-documento-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-vinculacao-documento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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
            ).subscribe((response) => {
                this.modalidadevinculacaoDocumentos = response['entities'];
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

    select(modalidadevinculacaoDocumento): void {
        this.selected.emit(modalidadevinculacaoDocumento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
