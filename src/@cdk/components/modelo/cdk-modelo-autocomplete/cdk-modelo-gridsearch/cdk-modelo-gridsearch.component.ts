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

import {Modelo, Pagination} from '@cdk/models';

import {ModeloService} from '@cdk/services/modelo.service';

@Component({
    selector: 'cdk-modelo-gridsearch',
    templateUrl: './cdk-modelo-gridsearch.component.html',
    styleUrls: ['./cdk-modelo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    andxFilter: any;

    @Input()
    mode = 'query';

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modelos: Modelo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modeloService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modeloService: ModeloService
    ) {
        this.loading = false;
        this.pagination = new Pagination();

        this.andxFilter = [];
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {
        this.loading = true;

        const filterParam = {
            ...params.filter,
        };

        if (filterParam.hasOwnProperty('documento.componentesDigitais.conteudo')) {
            this.mode = 'search';
        }
        this._modeloService[`${this.mode}`](
            JSON.stringify(filterParam),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modelos = response['entities'];
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
        this.load(params);
    }

    select(modelo): void {
        this.selected.emit(modelo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
