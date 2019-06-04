import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

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
export class CdkModalidadeVinculacaoDocumentoGridsearchComponent {

    @Input()
    filter = {};

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
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeVinculacaoDocumentoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadevinculacaoDocumentos = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
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
