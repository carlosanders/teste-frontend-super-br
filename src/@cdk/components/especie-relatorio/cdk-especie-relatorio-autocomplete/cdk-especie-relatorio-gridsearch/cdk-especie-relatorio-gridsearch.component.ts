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

import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {Pagination} from '@cdk/models';
import {EspecieRelatorio} from '../../../../models/especie-relatorio.model';

@Component({
    selector: 'cdk-especie-relatorio-gridsearch',
    templateUrl: './cdk-especie-relatorio-gridsearch.component.html',
    styleUrls: ['./cdk-especie-relatorio-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieRelatorioGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieRelatorios: EspecieRelatorio[];

    total = 0;

    loading: boolean;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'generoRelatorio.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _especieRelatorioService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieRelatorioService: EspecieRelatorioService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._especieRelatorioService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.especieRelatorios = response['entities'];
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

    select(especieRelatorio): void {
        this.selected.emit(especieRelatorio);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
