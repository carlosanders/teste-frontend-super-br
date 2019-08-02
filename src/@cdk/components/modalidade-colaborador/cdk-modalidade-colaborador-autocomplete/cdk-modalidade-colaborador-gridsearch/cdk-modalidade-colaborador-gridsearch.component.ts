import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {ModalidadeColaborador} from '@cdk/models/modalidade-colaborador.model';

@Component({
    selector: 'cdk-modalidade-colaborador-gridsearch',
    templateUrl: './cdk-modalidade-colaborador-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-colaborador-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeColaboradorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadecolaboradors: ModalidadeColaborador[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadecolaboradorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeColaboradorService: ModalidadeColaboradorService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeColaboradorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadecolaboradors = response['entities'];
                this.total = response['total'];
                this._changeDetectorRef.markForCheck();
            });
    }

    reload (params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(modalidadecolaborador): void {
        this.selected.emit(modalidadecolaborador);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
