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

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';

@Component({
    selector: 'cdk-vinculacao-etiqueta-gridsearch',
    templateUrl: './cdk-vinculacao-etiqueta-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoEtiquetas: VinculacaoEtiqueta[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoEtiquetaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._vinculacaoEtiquetaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoEtiquetas = response['entities'];
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

    select(vinculacaoEtiqueta): void {
        this.selected.emit(vinculacaoEtiqueta);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
