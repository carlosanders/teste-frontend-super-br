import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-tipo-validacao-workflow-autocomplete',
    templateUrl: './cdk-tipo-validacao-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-validacao-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoValidacaoWorkflowAutocomplete',
})
export class CdkTipoValidacaoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    tipoValidacaoWorkflowList: TipoValidacaoWorkflow[];

    @Input()
    tipoValidacaoWorkflowListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService
    ) {
        this.tipoValidacaoWorkflowList = [];
        this.tipoValidacaoWorkflowListIsLoading = false;

        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                    const andxFilter = [];
                    value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                        andxFilter.push({
                            valor: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.tipoValidacaoWorkflowListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._tipoValidacaoWorkflowService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.tipoValidacaoWorkflowListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.tipoValidacaoWorkflowList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayTipoValidacaoWorkflowFn(tipoValidacaoWorkflow): string {
        let displayed = tipoValidacaoWorkflow ? tipoValidacaoWorkflow.valor : '';
        displayed += (tipoValidacaoWorkflow && tipoValidacaoWorkflow.generoProcesso) ? (' (' + tipoValidacaoWorkflow.generoProcesso.nome + ')') : '';
        return displayed;
    }
}