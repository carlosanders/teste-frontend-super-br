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

import {Pagination, TransicaoWorkflow} from '@cdk/models';

import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';

@Component({
    selector: 'cdk-transicao-workflow-gridsearch',
    templateUrl: './cdk-transicao-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-transicao-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTransicaoWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    transicoesWorkflows: TransicaoWorkflow[];

    total = 0;

    loading: boolean;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'especieTarefa.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _transicaoWorkflowService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _transicaoWorkflowService: TransicaoWorkflowService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._transicaoWorkflowService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.transicoesWorkflows = response['entities'];
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

    select(transicaoWorkflow): void {
        this.selected.emit(transicaoWorkflow);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
