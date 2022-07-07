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
import {Pagination, Pessoa} from '@cdk/models';
import {PessoaService} from '@cdk/services/pessoa.service';
import {AbstractControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatAutocomplete} from '@cdk/angular/material';
import {TitleCasePipe} from "../../../pipes/title-case.pipe";

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

    @Input()
    mode = 'search';

    @ViewChild(MatAutocomplete, {static: true}) autocomplete: MatAutocomplete;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _pessoaService: PessoaService
    ) {
        this.pessoaList = [];
        this.pessoaListIsLoading = false;

        this.pagination = new Pagination();
    }

    fechado(): void {
        if (!this.control.value || typeof this.control.value === 'string' || !!this.control.value.id) {
            this.pessoaList = [];
        }
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => !!term && term.length >= 2),
            switchMap((value) => {
                const valor = value.replace(/[!@#$%&()+={}\[\];:<>,?]/g, '');
                    const termFilterNome = [];
                    const termFilterNumeroDocumentoPrincipal = [];
                    const context = {};
                    if (this.isCpfValid(valor)) {
                        context['cpf'] = valor;
                    }
                    if (this.isCnpjValid(valor)) {
                        context['cnpj'] = valor;
                    }
                    termFilterNome.push({
                        nome: `like:%${valor.trim()}%`
                    });
                    termFilterNumeroDocumentoPrincipal.push({
                        numeroDocumentoPrincipal: `like:%${valor}%`
                    });
                    let termFilter = {
                        andX: termFilterNome
                    };
                    if (!isNaN(valor)) {
                        termFilter = {
                            andX: termFilterNumeroDocumentoPrincipal
                        };
                    }

                    if (typeof valor === 'string' && (termFilterNome.length > 0 || termFilterNumeroDocumentoPrincipal.length > 0)) {
                        this.pessoaListIsLoading = true;
                        this._changeDetectorRef.detectChanges();
                        const filterParam = {
                            ...this.pagination.filter,
                            ...termFilter
                        };
                        return this._pessoaService[`${this.mode}`](
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
        ).subscribe((response) => {
            this.pessoaList = response['entities'];
            this._changeDetectorRef.markForCheck();
        });
    }

    displayPessoaFn(pessoa): string {
        let retorno = pessoa ? pessoa.nome : '';
        if (pessoa && pessoa.numeroDocumentoPrincipal) {
            retorno += ' (' + pessoa.numeroDocumentoPrincipal + ')';
        }
        if (pessoa && pessoa.pessoaValidada) {
            retorno += ' - VALIDADA';
        }
        if (pessoa && pessoa.pessoaConveniada) {
            retorno += ' - CONVENIADA';
        }
        return TitleCasePipe.format(retorno);
    }

    isCpfValid(cpf): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') {return false;}
        // Elimina CPFs invalidos conhecidos
        if (cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999')
            {return false;}
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++)
            {add += parseInt(cpf.charAt(i), 10) * (10 - i);}
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            {rev = 0;}
        if (rev !== parseInt(cpf.charAt(9), 10))
            {return false;}
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++)
            {add += parseInt(cpf.charAt(i), 10) * (11 - i);}
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            {rev = 0;}
        return rev === parseInt(cpf.charAt(10), 10);
    }

    isCnpjValid(cnpj): boolean {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj === '') {return false;}
        if (cnpj.length !== 14)
            {return false;}

        // Elimina CNPJs invalidos conhecidos
        if (cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999')
            {return false;}

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                {pos = 9;}
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            {return false;}

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                {pos = 9;}
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        return resultado == digitos.charAt(1);
    }
}
