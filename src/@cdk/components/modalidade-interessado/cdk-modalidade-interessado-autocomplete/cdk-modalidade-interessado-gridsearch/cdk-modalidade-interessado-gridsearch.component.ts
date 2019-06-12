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

import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {ModalidadeInteressado} from '@cdk/models/modalidade-interessado.model';

@Component({
    selector: 'cdk-modalidade-interessado-gridsearch',
    templateUrl: './cdk-modalidade-interessado-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-interessado-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeInteressadoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeinteressados: ModalidadeInteressado[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeinteressadoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeInteressadoService: ModalidadeInteressadoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeInteressadoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.modalidadeinteressados = response['entities'];
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
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(modalidadeinteressado): void {
        this.selected.emit(modalidadeinteressado);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
