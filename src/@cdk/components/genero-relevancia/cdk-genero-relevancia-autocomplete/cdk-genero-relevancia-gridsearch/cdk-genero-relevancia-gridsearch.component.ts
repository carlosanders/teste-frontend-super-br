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

import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {GeneroRelevancia} from '@cdk/models/genero-relevancia.model';

@Component({
    selector: 'cdk-genero-relevancia-gridsearch',
    templateUrl: './cdk-genero-relevancia-gridsearch.component.html',
    styleUrls: ['./cdk-genero-relevancia-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroRelevanciaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    generoRelevancias: GeneroRelevancia[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _generoRelevanciaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoRelevanciaService: GeneroRelevanciaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._generoRelevanciaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoRelevancias = response['entities'];
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

    select(generoRelevancia): void {
        this.selected.emit(generoRelevancia);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
