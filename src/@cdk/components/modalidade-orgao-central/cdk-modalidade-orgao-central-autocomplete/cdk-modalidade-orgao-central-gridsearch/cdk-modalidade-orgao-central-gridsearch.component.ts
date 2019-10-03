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

import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {ModalidadeOrgaoCentral} from '@cdk/models/modalidade-orgao-central.model';

@Component({
    selector: 'cdk-modalidade-orgao-central-gridsearch',
    templateUrl: './cdk-modalidade-orgao-central-gridsearch.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModalidadeOrgaoCentralGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    modalidadeorgaoCentrals: ModalidadeOrgaoCentral[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _modalidadeorgaoCentralService
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
            ).subscribe(response => {
                this.modalidadeorgaoCentrals = response['entities'];
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

    select(modalidadeorgaoCentral): void {
        this.selected.emit(modalidadeorgaoCentral);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
