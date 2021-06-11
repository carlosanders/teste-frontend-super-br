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

import {ModalidadeEtiqueta, Pagination} from '@cdk/models';

import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';

@Component({
    selector: 'cdk-modalidade-etiqueta-gridsearch',
    templateUrl: './cdk-modalidade-etiqueta-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-etiqueta-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeEtiquetaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

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
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeEtiquetaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadeetiquetas = response['entities'];
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

    select(modalidadeetiqueta): void {
        this.selected.emit(modalidadeetiqueta);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
