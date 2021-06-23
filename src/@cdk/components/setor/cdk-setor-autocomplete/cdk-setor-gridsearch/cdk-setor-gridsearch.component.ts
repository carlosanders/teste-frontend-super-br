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

import {Pagination, Setor} from '@cdk/models';

import {SetorService} from '@cdk/services/setor.service';

@Component({
    selector: 'cdk-setor-gridsearch',
    templateUrl: './cdk-setor-gridsearch.component.html',
    styleUrls: ['./cdk-setor-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSetorGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    setores: Setor[];

    total = 0;

    loading: boolean;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'sigla', 'unidade.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _setorService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _setorService: SetorService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._setorService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.setores = response['entities'];
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
        this.load(params);
    }

    select(setor): void {
        this.selected.emit(setor);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
