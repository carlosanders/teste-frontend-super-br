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

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';

@Component({
    selector: 'cdk-componente-digital-gridsearch',
    templateUrl: './cdk-componente-digital-gridsearch.component.html',
    styleUrls: ['./cdk-componente-digital-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkComponenteDigitalGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    componenteDigitals: ComponenteDigital[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _componenteDigitalService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._componenteDigitalService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.componenteDigitals = response['entities'];
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

    select(componenteDigital): void {
        this.selected.emit(componenteDigital);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
