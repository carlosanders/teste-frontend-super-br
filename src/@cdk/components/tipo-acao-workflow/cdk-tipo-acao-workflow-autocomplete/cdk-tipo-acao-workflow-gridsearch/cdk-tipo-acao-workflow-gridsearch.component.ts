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

import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {TipoAcaoWorkflow} from '@cdk/models';

@Component({
    selector: 'cdk-tipo-acao-workflow-gridsearch',
    templateUrl: './cdk-tipo-acao-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-tipo-acao-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoAcaoWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    tipoAcaoWorkflows: TipoAcaoWorkflow[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _tipoAcaoWorkflowService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._tipoAcaoWorkflowService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.tipoAcaoWorkflows = response['entities'];
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

    select(tipoAcaoWorkflow): void {
        this.selected.emit(tipoAcaoWorkflow);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
