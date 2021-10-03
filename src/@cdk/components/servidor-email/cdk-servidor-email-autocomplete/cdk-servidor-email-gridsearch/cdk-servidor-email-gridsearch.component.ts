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

import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {ServidorEmail, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-servidor-email-gridsearch',
    templateUrl: './cdk-servidor-email-gridsearch.component.html',
    styleUrls: ['./cdk-servidor-email-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkServidorEmailGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    servidorEmailList: ServidorEmail[];

    total = 0;

    loading: boolean;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'host', 'porta', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _servidorEmailService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _servidorEmailService: ServidorEmailService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._servidorEmailService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate),
            JSON.stringify(params.context))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.servidorEmailList = response['entities'];
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

    select(servidorEmail): void {
        this.selected.emit(servidorEmail);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
