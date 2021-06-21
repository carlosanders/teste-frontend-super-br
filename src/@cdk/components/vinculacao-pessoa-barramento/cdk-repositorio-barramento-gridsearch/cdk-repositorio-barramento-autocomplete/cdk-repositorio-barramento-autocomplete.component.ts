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
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";

@Component({
    selector: 'cdk-repositorio-barramento-autocomplete',
    templateUrl: './cdk-repositorio-barramento-autocomplete.component.html',
    styleUrls: ['./cdk-repositorio-barramento-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'repositorioBarramentoAutocomplete',
})
export class CdkRepositorioBarramentoAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    nomePesquisa: any;

    repositorioBarramentoList: any[];
    repositorioBarramentoListTotal: any[];
    repositorioBarramentoListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _repositorioBarramentoService: VinculacaoPessoaBarramentoService
    ) {
        this.repositorioBarramentoList = [];
        this.repositorioBarramentoListTotal = [];
        this.repositorioBarramentoListIsLoading = false;
    }

    ngOnInit(): void {

        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                if (value) {
                    this.nomePesquisa = value;
                    if (typeof value === 'string' && value.length >= 2 &&
                        this.repositorioBarramentoListTotal.length === 0) {
                        this.repositorioBarramentoListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        return this._repositorioBarramentoService.consultaRepositorio();
                    } else {
                        return of(this.repositorioBarramentoListTotal);
                    }
                }
            }
        )).subscribe(response => {
            if (this.repositorioBarramentoListTotal.length === 0) {
                this.repositorioBarramentoListTotal = response;
            }
            this.repositorioBarramentoListIsLoading = false
            this.repositorioBarramentoList = [];
            this.repositorioBarramentoList =
                this.repositorioBarramentoListTotal.filter(el => {
                   return el.nome.toLowerCase().indexOf(this.nomePesquisa.toLowerCase()) >= 0
            });
            this._changeDetectorRef.markForCheck();
        });
    }

    displayRepositorioBarramentoFn(repositorioBarramento): string {
        return repositorioBarramento ? repositorioBarramento.nome + ' - ID ' +
            repositorioBarramento.id : null;
    }
}
