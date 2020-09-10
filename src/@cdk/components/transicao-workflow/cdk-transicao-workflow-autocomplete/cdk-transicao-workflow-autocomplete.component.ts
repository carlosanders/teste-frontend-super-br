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
import {Pagination, TransicaoWorkflow} from '@cdk/models';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TransicaoWorkflowService} from '../../../services/transicao-workflow.service';

@Component({
    selector: 'cdk-transicao-workflow-autocomplete',
    templateUrl: './cdk-transicao-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-transicao-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'transicaoWorkflowAutocomplete',
})
export class CdkTransicaoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    transicoesWorkflowsList: TransicaoWorkflow[];

    @Input()
    transicaoWorkflowListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _transicaoWorkflowService: TransicaoWorkflowService
    ) {
        this.transicoesWorkflowsList = [];
        this.transicaoWorkflowListIsLoading = false;

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
                            'workflow.especieProcesso.nome': `like:%${bit}%`
                        };
                    });
                    if (typeof value === 'string') {
                        this.transicaoWorkflowListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._transicaoWorkflowService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.transicaoWorkflowListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.transicoesWorkflowsList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayTransicaoWorkflowFn(transicaoWorkflow): string {
        const displayed = transicaoWorkflow ? transicaoWorkflow.workflow.especieProcesso.nome : '';
        return displayed;
    }
}