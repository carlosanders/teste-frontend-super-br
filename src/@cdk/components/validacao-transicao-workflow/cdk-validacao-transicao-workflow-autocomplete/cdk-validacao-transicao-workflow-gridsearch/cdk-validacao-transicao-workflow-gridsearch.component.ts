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

import {Pagination} from '@cdk/models';

import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

@Component({
    selector: 'cdk-validacao-transicao-workflow-gridsearch',
    templateUrl: './cdk-validacao-transicao-workflow-gridsearch.component.html',
    styleUrls: ['./cdk-validacao-transicao-workflow-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkValidacaoTransicaoWorkflowGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    acoes: ValidacaoTransicaoWorkflow[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _validacaoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _validacaoService: ValidacaoTransicaoWorkflowService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._validacaoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.acoes = response['entities'];
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

    select(validacao): void {
        this.selected.emit(validacao);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
