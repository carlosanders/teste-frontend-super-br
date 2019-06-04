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

import {ModalidadeTipoInibidorService} from '@cdk/services/modalidade-tipo-inibidor.service';
import {ModalidadeTipoInibidor} from '@cdk/models/modalidade-tipo-inibidor.model';

@Component({
    selector: 'cdk-modalidade-tipo-inibidorgridsearch',
    templateUrl: './cdk-modalidade-tipo-inibidor-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-tipo-inibidor-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeTipoInibidorGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadetipoInibidors: ModalidadeTipoInibidor[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadetipoInibidorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeTipoInibidorService: ModalidadeTipoInibidorService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeTipoInibidorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadetipoInibidors = response['entities'];
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

    select(modalidadetipoInibidor): void {
        this.selected.emit(modalidadetipoInibidor);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
