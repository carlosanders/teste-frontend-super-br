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
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination, ValidacaoTransicaoWorkflow} from '@cdk/models';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";


@Component({
    selector: 'cdk-validacao-transicao-workflow-autocomplete',
    templateUrl: './cdk-validacao-transicao-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-validacao-transicao-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'validacaoAutocomplete',
})
export class CdkValidacaoTransicaoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    validacaoList: ValidacaoTransicaoWorkflow[];

    validacaoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _validacaoService: ValidacaoTransicaoWorkflowService
    ) {
        this.validacaoList = [];
        this.validacaoListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.validacaoList = [];
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
                            contexto: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.validacaoListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._validacaoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.validacaoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.validacaoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }


    displayValidacaoFn(validacao): string {
        return validacao ? TitleCasePipe.format(validacao.contexto) : null;
    }
}
