import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-pessoa-filter',
    templateUrl: './cdk-pessoa-filter.component.html',
    styleUrls: ['./cdk-pessoa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkPessoaFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filterDataNascimento = [];
    filterDataObito = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null],
            numeroDocumentoPrincipal: [null],
            pessoaValidada: [null],
            dataNascimento: [null],
            dataObito: [null],
            nomeGenitora: [null],
            modalidadeQualificacaoPessoa: [null],
            modalidadeGeneroPessoa: [null],
            pessoaConveniada: [null]
        });
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('nome').value && (this.form.get('nome').value.length >= 2)) {
            andXFilter.push({'nome': `like:%${this.form.get('nome').value}%`});
        }

        if (this.form.get('nomeGenitora').value && (this.form.get('nomeGenitora').value.length >= 2)) {
            andXFilter.push({'nomeGenitora': `like:%${this.form.get('nomeGenitora').value}%`});
        }

        if (this.form.get('numeroDocumentoPrincipal').value && (this.form.get('numeroDocumentoPrincipal').value.length >= 2)) {
            andXFilter.push({'numeroDocumentoPrincipal': `like:%${this.form.get('numeroDocumentoPrincipal').value}%`});
        }

        if (this.form.get('id').value && (this.form.get('id').value.length >= 1)) {
            andXFilter.push({'id': `eq:${this.form.get('id').value}`});
        }

        if (this.form.get('modalidadeGeneroPessoa').value) {
            andXFilter.push({'modalidadeGeneroPessoa.id': `eq:${this.form.get('modalidadeGeneroPessoa').value.id}`});
        }

        if (this.form.get('modalidadeQualificacaoPessoa').value) {
            andXFilter.push({'modalidadeQualificacaoPessoa.id': `eq:${this.form.get('modalidadeQualificacaoPessoa').value.id}`});
        }

        if (this.form.get('modalidadeQualificacaoPessoa').value) {
            andXFilter.push({'modalidadeQualificacaoPessoa.id': `eq:${this.form.get('modalidadeQualificacaoPessoa').value.id}`});
        }

        if (this.form.get('pessoaConveniada').value) {
            andXFilter.push({'pessoaConveniada': `eq:true`});
        }

        if (this.form.get('pessoaValidada').value) {
            andXFilter.push({'pessoaValidada': `eq:true`});
        }

        if (this.filterDataObito?.length) {
            this.filterDataObito.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataNascimento?.length) {
            this.filterDataNascimento.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
    }

    filtraDataNascimento(value: any): void {
        this.filterDataNascimento = value;
    }

    filtraDataObito(value: any): void {
        this.filterDataObito = value;
    }

    verificarValor(objeto): void {
        const objetoForm = this.form.get(objeto.target.getAttribute('formControlName'));
        if (!objetoForm.value || typeof objetoForm.value !== 'object') {
            objetoForm.setValue(null);
        }
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }
}
