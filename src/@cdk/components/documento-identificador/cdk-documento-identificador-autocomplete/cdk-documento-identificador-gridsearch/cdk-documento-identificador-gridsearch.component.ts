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

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {DocumentoIdentificador} from '@cdk/models/documento-identificador.model';

@Component({
    selector: 'cdk-documento-identificador-gridsearch',
    templateUrl: './cdk-documento-identificador-gridsearch.component.html',
    styleUrls: ['./cdk-documento-identificador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoIdentificadorGridsearchComponent {

    @Input()
    filter = {};

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
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._documentoIdentificadorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.documentoIdentificadors = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load(params);
    }

    select(documentoIdentificador): void {
        this.selected.emit(documentoIdentificador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
