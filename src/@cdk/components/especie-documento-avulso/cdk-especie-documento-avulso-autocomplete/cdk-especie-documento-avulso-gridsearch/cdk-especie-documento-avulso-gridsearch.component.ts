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

import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {EspecieDocumentoAvulso} from '@cdk/models/especie-documento-avulso.model';

@Component({
    selector: 'cdk-especie-documento-avulso-gridsearch',
    templateUrl: './cdk-especie-documento-avulso-gridsearch.component.html',
    styleUrls: ['./cdk-especie-documento-avulso-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieDocumentoAvulsoGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieDocumentoAvulsos: EspecieDocumentoAvulso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _especieDocumentoAvulsoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieDocumentoAvulsoService: EspecieDocumentoAvulsoService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._especieDocumentoAvulsoService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.especieDocumentoAvulsos = response['entities'];
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

    select(especieDocumentoAvulso): void {
        this.selected.emit(especieDocumentoAvulso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
