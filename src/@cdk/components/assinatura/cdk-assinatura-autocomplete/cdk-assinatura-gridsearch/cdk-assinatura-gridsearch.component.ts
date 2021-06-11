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
import {Assinatura, Pagination} from '@cdk/models';

import {AssinaturaService} from '@cdk/services/assinatura.service';


@Component({
    selector: 'cdk-assinatura-gridsearch',
    templateUrl: './cdk-assinatura-gridsearch.component.html',
    styleUrls: ['./cdk-assinatura-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssinaturaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    assinaturas: Assinatura[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _assinaturaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _assinaturaService: AssinaturaService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._assinaturaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.assinaturas = response['entities'];
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

    select(assinatura): void {
        this.selected.emit(assinatura);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
