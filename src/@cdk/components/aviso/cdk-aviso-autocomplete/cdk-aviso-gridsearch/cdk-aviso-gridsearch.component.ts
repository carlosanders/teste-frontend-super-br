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
import {Aviso, Pagination} from '@cdk/models';
import {AvisoService} from '../../../../services/aviso.service';

@Component({
    selector: 'cdk-aviso-gridsearch',
    templateUrl: './cdk-aviso-gridsearch.component.html',
    styleUrls: ['./cdk-aviso-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAvisoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    avisos: Aviso[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _avisoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _avisoService: AvisoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {
        this.loading = true;
        this._avisoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.avisos = response['entities'];
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

    select(aviso): void {
        this.selected.emit(aviso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
