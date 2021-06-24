import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';
import {VinculacaoPessoaBarramento} from "../../../models/vinculacao-pessoa-barramento";
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";

@Component({
    selector: 'cdk-vinculacao-pessoa-barramento-autocomplete',
    templateUrl: './cdk-vinculacao-pessoa-barramento-autocomplete.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-barramento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'vinculacaoPessoaBarramentoAutocomplete',
})
export class CdkVinculacaoPessoaBarramentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    vinculacaoPessoaBarramentoList: VinculacaoPessoaBarramento[];
    vinculacaoPessoaBarramentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.vinculacaoPessoaBarramentoList = [];
        this.vinculacaoPessoaBarramentoListIsLoading = false;

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
                            servico: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.vinculacaoPessoaBarramentoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._vinculacaoPessoaBarramentoService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.vinculacaoPessoaBarramentoListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.vinculacaoPessoaBarramentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayVinculacaoPessoaBarramentoFn(vinculacaoPessoaBarramento): string {
        return vinculacaoPessoaBarramento ? vinculacaoPessoaBarramento.nome : null;
    }
}
