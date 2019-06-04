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

import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {ModalidadeDocumentoIdentificador} from '@cdk/models/modalidade-documento-identificador.model';

@Component({
    selector: 'cdk-modalidade-documento-identificador-gridsearch',
    templateUrl: './cdk-modalidade-documento-identificador-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-documento-identificador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeDocumentoIdentificadorGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadedocumentoIdentificadors: ModalidadeDocumentoIdentificador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadedocumentoIdentificadorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeDocumentoIdentificadorService: ModalidadeDocumentoIdentificadorService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeDocumentoIdentificadorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadedocumentoIdentificadors = response['entities'];
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

    select(modalidadedocumentoIdentificador): void {
        this.selected.emit(modalidadedocumentoIdentificador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
