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

import {ModalidadeOrgaoCentral, Pagination} from '@cdk/models';

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';

@Component({
    selector: 'cdk-modalidade-orgao-central-gridsearch',
    templateUrl: './cdk-modalidade-orgao-central-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeOrgaoCentralGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeOrgaoCentralList: ModalidadeOrgaoCentral[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeOrgaoCentralService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeOrgaoCentralService: ModalidadeOrgaoCentralService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._modalidadeOrgaoCentralService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.modalidadeOrgaoCentralList = response['entities'];
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

    select(modalidadeOrgaoCentral): void {
        this.selected.emit(modalidadeOrgaoCentral);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
