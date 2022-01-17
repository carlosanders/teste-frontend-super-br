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

import {Pagination, VinculacaoEspecieProcessoWorkflow} from '@cdk/models';

import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';

@Component({
    selector: 'cdk-vinculacao-especie-processo-workflow-gridsearch',
    templateUrl: './cdk-vinculacao-especie-processo-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-vinculacao-especie-processo-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEspecieProcessoWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    vinculacoesEspecieProcessoWorkflow: VinculacaoEspecieProcessoWorkflow[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _vinculacaoEspecieProcessoWorkflowService
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _vinculacaoEspecieProcessoWorkflowService: VinculacaoEspecieProcessoWorkflowService)
    {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void
    {
        this.load(this.pagination);
    }

    load(params): void
    {

        this.loading = true;

        this._vinculacaoEspecieProcessoWorkflowService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.vinculacoesEspecieProcessoWorkflow = response['entities'];
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

    select(vinculacaoProcesso): void {
        this.selected.emit(vinculacaoProcesso);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
