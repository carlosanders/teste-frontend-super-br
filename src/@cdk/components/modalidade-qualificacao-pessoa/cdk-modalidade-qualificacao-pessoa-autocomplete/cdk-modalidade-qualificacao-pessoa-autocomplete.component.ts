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
import {ModalidadeQualificacaoPessoa, Pagination} from '@cdk/models';
import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

@Component({
    selector: 'cdk-modalidade-qualificacao-pessoa-autocomplete',
    templateUrl: './cdk-modalidade-qualificacao-pessoa-autocomplete.component.html',
    styleUrls: ['./cdk-modalidade-qualificacao-pessoa-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    exportAs: 'modalidadeQualificacaoPessoaAutocomplete',
})
export class CdkModalidadeQualificacaoPessoaAutocompleteComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Input()
    control: AbstractControl;

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;
    modalidadeQualificacaoPessoaList: ModalidadeQualificacaoPessoa[];

    modalidadeQualificacaoPessoaListIsLoading: boolean;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalidadeQualificacaoPessoaService: ModalidadeQualificacaoPessoaService
    ) {
        this.modalidadeQualificacaoPessoaList = [];
        this.modalidadeQualificacaoPessoaListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.modalidadeQualificacaoPessoaList = [];
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
                            valor: `like:%${bit}%`});
                    });
                    if (typeof value === 'string' && andxFilter.length > 0) {
                        this.modalidadeQualificacaoPessoaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            andX: andxFilter
                        };
                        return this._modalidadeQualificacaoPessoaService.query(
                            JSON.stringify(filterParam),
                            this.pagination.limit,
                            this.pagination.offset,
                            JSON.stringify(this.pagination.sort),
                            JSON.stringify(this.pagination.populate))
                            .pipe(
                                finalize(() => this.modalidadeQualificacaoPessoaListIsLoading = false),
                                catchError(() => of([]))
                            );
                    } else {
                        return of([]);
                    }
                }
            )
        ).subscribe((response) => {
            this.modalidadeQualificacaoPessoaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayModalidadeQualificacaoPessoaFn(modalidadeQualificacaoPessoa): string {
        return modalidadeQualificacaoPessoa ? TitleCasePipe.format(modalidadeQualificacaoPessoa.valor) : null;
    }
}
