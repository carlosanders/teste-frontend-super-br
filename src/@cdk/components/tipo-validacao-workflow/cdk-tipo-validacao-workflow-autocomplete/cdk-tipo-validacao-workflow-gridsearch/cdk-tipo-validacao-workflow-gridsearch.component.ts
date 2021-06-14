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

import {Pagination, TipoValidacaoWorkflow} from '@cdk/models';

import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';

@Component({
    selector: 'cdk-tipo-validacao-workflow-gridsearch',
    templateUrl: './cdk-tipo-validacao-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-tipo-validacao-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    tipoValidacaoWorkflows: TipoValidacaoWorkflow[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _tipoValidacaoWorkflowService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._tipoValidacaoWorkflowService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.tipoValidacaoWorkflows = response['entities'];
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

    select(tipoValidacaoWorkflow): void {
        this.selected.emit(tipoValidacaoWorkflow);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
