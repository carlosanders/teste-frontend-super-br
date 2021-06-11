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

import {ModalidadeModelo, Pagination} from '@cdk/models';

import {ModalidadeModeloService} from '@cdk/services/modalidade-modelo.service';

@Component({
    selector: 'cdk-modalidade-modelo-gridsearch',
    templateUrl: './cdk-modalidade-modelo-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-modelo-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeModeloGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidademodelos: ModalidadeModelo[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidademodeloService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeModeloService: ModalidadeModeloService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeModeloService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidademodelos = response['entities'];
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

    select(modalidademodelo): void {
        this.selected.emit(modalidademodelo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
