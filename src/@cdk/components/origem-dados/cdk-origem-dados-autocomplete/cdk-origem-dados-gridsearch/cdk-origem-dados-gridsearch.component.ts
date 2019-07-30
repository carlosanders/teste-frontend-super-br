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

import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {OrigemDados} from '@cdk/models/origem-dados.model';

@Component({
    selector: 'cdk-origem-dados-gridsearch',
    templateUrl: './cdk-origem-dados-gridsearch.component.html',
    styleUrls: ['./cdk-origem-dados-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkOrigemDadosGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    origemDadoss: OrigemDados[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _origemDadosService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _origemDadosService: OrigemDadosService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._origemDadosService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.origemDadoss = response['entities'];
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

    select(origemDados): void {
        this.selected.emit(origemDados);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
