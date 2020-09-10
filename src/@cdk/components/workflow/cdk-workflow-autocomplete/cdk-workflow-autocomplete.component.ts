import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, Workflow} from '@cdk/models';
import {WorkflowService} from '@cdk/services/workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

@Component({
    selector: 'cdk-workflow-autocomplete',
    templateUrl: './cdk-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'workflowAutocomplete',
})
export class CdkWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    workflowList: Workflow[];

    @Input()
    workflowListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _workflowService: WorkflowService
    ) {
        this.workflowList = [];
        this.workflowListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {

        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    let termFilter = {};
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        termFilter = {
                            ...termFilter,
                            'especieProcesso.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.workflowListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._workflowService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.workflowListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.workflowList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayWorkflowFn(workflow): string {
        const displayed = workflow ? workflow.especieProcesso.nome : '';
        return displayed;
    }
}