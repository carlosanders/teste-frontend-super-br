import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Pessoa} from '@cdk/models';
import {PessoaService} from '@cdk/services/pessoa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-pessoa-autocomplete',
    templateUrl: './cdk-pessoa-autocomplete.component.html',
    styleUrls: ['./cdk-pessoa-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'pessoaAutocomplete',
})
export class CdkPessoaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @Input()
    pessoaList: Pessoa[];

    @Input()
    pessoaListIsLoading: boolean;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _pessoaService: PessoaService
    ) {
        this.pessoaList = [];
        this.pessoaListIsLoading = false;

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
                        termFilter = [
                            {
                                nome: `like:%${bit}%`
                            },
                            {
                                numeroDocumentoPrincipal: `like:%${bit}%`
                            }
                        ];
                    });
                    if (typeof value === 'string') {
                        this.pessoaListIsLoading = true;
                        this._changeDetectorRef.markForCheck();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._pessoaService.search(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.pessoaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe(response => {
            this.pessoaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayPessoaFn(pessoa): string {
        let retorno = pessoa ? pessoa.nome : '';
        if (pessoa && pessoa.numeroDocumentoPrincipal) {
            retorno += ' (' + pessoa.numeroDocumentoPrincipal + ')';
        }
        return retorno;
    }
}
