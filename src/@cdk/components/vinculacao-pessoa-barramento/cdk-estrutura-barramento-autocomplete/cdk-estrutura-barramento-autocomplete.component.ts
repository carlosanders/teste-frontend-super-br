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
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

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

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    estruturaBarramentoList: any[];

    estruturaBarramentoListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _estruturaBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.estruturaBarramentoList = [];
        this.estruturaBarramentoListIsLoading = false;
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.estruturaBarramentoList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(600),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 5),
            switchMap((value) => {
                if (typeof value === 'string' && value.length >= 5) {
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
            })
        ).subscribe((response) => {
            this.estruturaBarramentoListIsLoading = false;
            this.estruturaBarramentoList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayEstruturaBarramentoFn(estruturaBarramento): string {
        if(!estruturaBarramento){return null;}
        if(Array.isArray(estruturaBarramento.hierarquia)){
            return TitleCasePipe.format(estruturaBarramento.nome) + ' - ' +
                estruturaBarramento.sigla + ' / ' +
                estruturaBarramento.hierarquia.reduce(acc => acc['sigla'] + ' / ') + ' - ID ' +
                estruturaBarramento.numeroDeIdentificacaoDaEstrutura;
        }else{
            return TitleCasePipe.format(estruturaBarramento.nome) + ' - ' +
            estruturaBarramento.sigla + ' - ID ' +
            estruturaBarramento.numeroDeIdentificacaoDaEstrutura ;
        }
    }
}
