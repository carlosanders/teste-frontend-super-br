import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination, VinculacaoEtiqueta} from '@cdk/models';

import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@Component({
    selector: 'cdk-vinculacao-etiqueta-gridsearch',
    templateUrl: './cdk-vinculacao-etiqueta-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

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
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._vinculacaoEtiquetaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.vinculacaoEtiquetas = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

   reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        };
        this.load (params);
    }

    select(vinculacaoEtiqueta): void {
        this.selected.emit(vinculacaoEtiqueta);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
