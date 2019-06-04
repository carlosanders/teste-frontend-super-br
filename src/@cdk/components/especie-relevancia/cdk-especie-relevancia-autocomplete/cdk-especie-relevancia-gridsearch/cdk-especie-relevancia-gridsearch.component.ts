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

import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {EspecieRelevancia} from '@cdk/models/especie-relevancia.model';

@Component({
    selector: 'cdk-especie-relevancia-gridsearch',
    templateUrl: './cdk-especie-relevancia-gridsearch.component.html',
    styleUrls: ['./cdk-especie-relevancia-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieRelevanciaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieRelevancias: EspecieRelevancia[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _especieRelevanciaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieRelevanciaService: EspecieRelevanciaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._especieRelevanciaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.especieRelevancias = response['entities'];
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

    select(especieRelevancia): void {
        this.selected.emit(especieRelevancia);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
