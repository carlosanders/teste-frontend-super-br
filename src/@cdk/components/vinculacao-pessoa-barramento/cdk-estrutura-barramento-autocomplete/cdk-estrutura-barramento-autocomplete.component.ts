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
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";

@Component({
    selector: 'cdk-estrutura-barramento-autocomplete',
    templateUrl: './cdk-estrutura-barramento-autocomplete.component.html',
    styleUrls: ['./cdk-estrutura-barramento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'estruturaBarramentoAutocomplete',
})
export class CdkEstruturaBarramentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    estruturaBarramentoList: any[];
    estruturaBarramentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _estruturaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.estruturaBarramentoList = [];
        this.estruturaBarramentoListIsLoading = false;
    }

    ngOnInit(): void {

        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {

                if (typeof value === 'string' && value.length >= 2) {
                    const filterParam = {
                        nome: value,
                        filter: this.pagination.filter,
                        limit: this.pagination.limit,
                        offset: this.pagination.offset
                    };
                    this.estruturaBarramentoListIsLoading = true;
                    this._changeDetectorRef.markForCheck();
                    return this._estruturaBarramentoService.consultaEstrutura(filterParam);
                } else {
                    return of([]);
                }
            }
        )).subscribe(response => {
            this.estruturaBarramentoListIsLoading = false;
            this.estruturaBarramentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEstruturaBarramentoFn(estruturaBarramento): string {
        return estruturaBarramento ? estruturaBarramento.nome + ' - ID ' +
            estruturaBarramento.numeroDeIdentificacaoDaEstrutura : null;
    }
}
