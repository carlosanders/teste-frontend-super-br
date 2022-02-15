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

import {Pagination, Workflow} from '@cdk/models';

import {WorkflowService} from '@cdk/services/workflow.service';

@Component({
    selector: 'cdk-workflow-gridsearch',
    templateUrl: './cdk-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    workflows: Workflow[];

    total = 0;

    loading: boolean;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'especieTarefaInicial.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _workflowService
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _workflowService: WorkflowService) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._workflowService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.workflows = response['entities'];
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

    select(workflow): void {
        this.selected.emit(workflow);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
