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

import {catchError, finalize, switchMap} from 'rxjs/operators';

import {Pagination} from '@cdk/models';
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";

@Component({
    selector: 'cdk-estrutura-barramento-gridsearch',
    templateUrl: './cdk-estrutura-barramento-gridsearch.component.html',
    styleUrls: ['./cdk-estrutura-barramento-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEstruturaBarramentoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    estruturaBarramentos: any[];

    @Output()
    create = new EventEmitter<any>();

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _estruturaBarramentoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _estruturaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        const filterParam = {
            filter: this.pagination.filter,
            limit: this.pagination.limit,
            offset: this.pagination.offset
        };

        this._estruturaBarramentoService.consultaEstrutura(filterParam)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.estruturaBarramentos = response['entities'].sort(function(a,b) {
                return a['nome'].trim()-b['nome'].trim()
            });
            this.total = response['total'];
            this.pagination.offset = this.pagination.offset + this.pagination.limit;
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

    select(estruturaBarramento): void {
        this.selected.emit(estruturaBarramento);
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

}
