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

import {ModalidadeRepositorio, Pagination} from '@cdk/models';

import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';

@Component({
    selector: 'cdk-modalidade-repositorio-gridsearch',
    templateUrl: './cdk-modalidade-repositorio-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-repositorio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeRepositorioGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidaderepositorios: ModalidadeRepositorio[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidaderepositorioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeRepositorioService: ModalidadeRepositorioService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeRepositorioService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidaderepositorios = response['entities'];
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

    select(modalidaderepositorio): void {
        this.selected.emit(modalidaderepositorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
