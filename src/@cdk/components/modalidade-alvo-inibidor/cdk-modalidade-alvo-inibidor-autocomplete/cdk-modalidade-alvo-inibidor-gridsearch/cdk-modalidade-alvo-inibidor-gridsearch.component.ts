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

import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {ModalidadeAlvoInibidor} from '@cdk/models/modalidade-alvo-inibidor.model';

@Component({
    selector: 'cdk-modalidade-alvo-inibidor-gridsearch',
    templateUrl: './cdk-modalidade-alvo-inibidor-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-alvo-inibidor-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeAlvoInibidorGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadealvoInibidors: ModalidadeAlvoInibidor[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadealvoInibidorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeAlvoInibidorService: ModalidadeAlvoInibidorService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._modalidadeAlvoInibidorService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadealvoInibidors = response['entities'];
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

    select(modalidadealvoInibidor): void {
        this.selected.emit(modalidadealvoInibidor);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
