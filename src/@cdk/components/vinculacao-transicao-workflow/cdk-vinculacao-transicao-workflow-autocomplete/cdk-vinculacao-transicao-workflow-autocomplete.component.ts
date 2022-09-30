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
import {Pagination, VinculacaoTransicaoWorkflow} from '@cdk/models';
import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import { TitleCasePipe } from '@cdk/pipes/title-case.pipe';

@Component({
    selector: 'cdk-vinculacao-transicao-workflow-autocomplete',
    templateUrl: './cdk-vinculacao-transicao-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-transicao-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoTransicaoWorkflowAutocomplete',
})
export class CdkVinculacaoTransicaoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    vinculacaoTransicaoWorkflowList: VinculacaoTransicaoWorkflow[];

    listIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoTransicaoWorkflowService: VinculacaoTransicaoWorkflowService
    ) {
        this.vinculacaoTransicaoWorkflowList = [];
        this.listIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.vinculacaoTransicaoWorkflowList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                        andxFilter.push({
                            processo: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.listIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._vinculacaoTransicaoWorkflowService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.listIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.vinculacaoTransicaoWorkflowList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoTransicaoWorkflowFn(vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflow): string {
        let arrText = [];
        arrText.push(vinculacaoTransicaoWorkflow.id);
        if (vinculacaoTransicaoWorkflow.workflow?.nome) {
            arrText.push('DE: ' + TitleCasePipe.format(vinculacaoTransicaoWorkflow.workflow.nome));
        }
        if (vinculacaoTransicaoWorkflow.transicaoWorkflow?.workflow.nome) {
            arrText.push('PARA: ' + TitleCasePipe.format(vinculacaoTransicaoWorkflow.transicaoWorkflow.workflow.nome));
        }
        return arrText.join(' - ');
    }
}
