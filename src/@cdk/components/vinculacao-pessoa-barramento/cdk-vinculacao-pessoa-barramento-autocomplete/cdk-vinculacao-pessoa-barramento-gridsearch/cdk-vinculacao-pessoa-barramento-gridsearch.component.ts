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

import {cdkAnimations} from '@cdk/animations';
import {catchError, finalize} from 'rxjs/operators';
import {Pagination} from '@cdk/models';
import {VinculacaoPessoaBarramento} from "../../../../models/vinculacao-pessoa-barramento";
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";

@Component({
    selector: 'cdk-vinculacao-pessoa-barramento-gridsearch',
    templateUrl: './cdk-vinculacao-pessoa-barramento-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-barramento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoPessoaBarramentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacaoPessoaBarramentos: VinculacaoPessoaBarramento[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoPessoaBarramentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._vinculacaoPessoaBarramentoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.vinculacaoPessoaBarramentos = response['entities'];
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

    select(vinculacaoPessoaBarramento): void {
        this.selected.emit(vinculacaoPessoaBarramento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
