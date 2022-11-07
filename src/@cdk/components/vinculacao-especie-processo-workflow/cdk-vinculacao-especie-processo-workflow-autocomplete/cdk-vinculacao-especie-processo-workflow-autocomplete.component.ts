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
import {Pagination, VinculacaoEspecieProcessoWorkflow} from '@cdk/models';
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-vinculacao-especie-processo-workflow-autocomplete',
    templateUrl: './cdk-vinculacao-especie-processo-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-especie-processo-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoEspecieProcessoWorkflowAutocomplete',
})
export class CdkVinculacaoEspecieProcessoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    vinculacaoEspecieProcessoWorkflowList: VinculacaoEspecieProcessoWorkflow[];

    listIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoEspecieProcessoWorkflowService: VinculacaoEspecieProcessoWorkflowService
    ) {
        this.vinculacaoEspecieProcessoWorkflowList = [];
        this.listIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.vinculacaoEspecieProcessoWorkflowList = [];
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
                        return this._vinculacaoEspecieProcessoWorkflowService.query(
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
            this.vinculacaoEspecieProcessoWorkflowList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoEspecieProcessoWorkflowFn(vinculacaoEspecieProcessoWorkflow): string {
        let arrText = [];
        if (vinculacaoEspecieProcessoWorkflow.especieProcesso?.nome) {
            arrText.push(TitleCasePipe.format(vinculacaoEspecieProcessoWorkflow.especieProcesso.nome));
        }
        if (vinculacaoEspecieProcessoWorkflow.workflow?.nome) {
            arrText.push(TitleCasePipe.format(vinculacaoEspecieProcessoWorkflow.workflow.nome));
        }
        return arrText.join(' - ');
    }
}
