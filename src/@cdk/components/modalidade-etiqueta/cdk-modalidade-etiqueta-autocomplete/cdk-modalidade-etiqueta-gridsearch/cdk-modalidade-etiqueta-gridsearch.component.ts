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

import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {ModalidadeEtiqueta} from '@cdk/models/modalidade-etiqueta.model';

@Component({
    selector: 'cdk-modalidade-etiqueta-gridsearch',
    templateUrl: './cdk-modalidade-etiqueta-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-etiqueta-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeEtiquetaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeetiquetas: ModalidadeEtiqueta[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeetiquetaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeEtiquetaService: ModalidadeEtiquetaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeEtiquetaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadeetiquetas = response['entities'];
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

    select(modalidadeetiqueta): void {
        this.selected.emit(modalidadeetiqueta);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
