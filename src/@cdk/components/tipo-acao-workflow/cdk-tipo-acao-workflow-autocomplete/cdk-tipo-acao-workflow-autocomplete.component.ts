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
import {Pagination, TipoAcaoWorkflow} from '@cdk/models';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';

@Component({
    selector: 'cdk-tipo-acao-workflow-autocomplete',
    templateUrl: './cdk-tipo-acao-workflow-autocomplete.component.html',
    styleUrls: ['./cdk-tipo-acao-workflow-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'tipoAcaoWorkflowAutocomplete',
})
export class CdkTipoAcaoWorkflowAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    tipoAcaoWorkflowList: TipoAcaoWorkflow[];

    @Input()
    tipoAcaoWorkflowListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService
    ) {
        this.tipoAcaoWorkflowList = [];
        this.tipoAcaoWorkflowListIsLoading = false;

        this.pagination = new Pagination();
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
                            valor: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.tipoAcaoWorkflowListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._tipoAcaoWorkflowService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.tipoAcaoWorkflowListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.tipoAcaoWorkflowList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayTipoAcaoWorkflowFn(tipoAcaoWorkflow): string {
        let displayed = tipoAcaoWorkflow ? tipoAcaoWorkflow.valor : '';
        displayed += (tipoAcaoWorkflow && tipoAcaoWorkflow.generoProcesso) ? (' (' + tipoAcaoWorkflow.generoProcesso.nome + ')') : '';
        return displayed;
    }
}
