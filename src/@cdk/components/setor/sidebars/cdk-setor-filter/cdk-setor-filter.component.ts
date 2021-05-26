import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-setor-filter',
    templateUrl: './cdk-setor-filter.component.html',
    styleUrls: ['./cdk-setor-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSetorFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            especieSetor: [null],
            generoSetor: [null],
            modalidadeOrgaoCentral: [null],
            endereco: [null],
            email: [null],
            sigla: [null],
            unidade: [null],
            parent: [null],
            unidadePai: [null],
            municipio: [null],
            prefixoNUP: [null],
            sequenciaInicialNUP: [null],
            gerenciamento: [null],
            apenasProtocolo: [null],
            numeracaoDocumentoUnidade: [null],
            apenasDistribuidor: [null],
            distribuicaoCentena: [null],
            prazoEqualizacao: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('endereco').value) {
            this.form.get('endereco').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'endereco': `like:%${bit}%`});
            });
        }

        if (this.form.get('email').value) {
            this.form.get('email').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'email': `like:%${bit}%`});
            });
        }

        if (this.form.get('sigla').value) {
            this.form.get('sigla').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'sigla': `like:%${bit}%`});
            });
        }

        if (this.form.get('prefixoNUP').value) {
            this.form.get('prefixoNUP').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'prefixoNUP': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoEqualizacao').value) {
            this.form.get('prazoEqualizacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'prazoEqualizacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('sequenciaInicialNUP').value) {
            this.form.get('sequenciaInicialNUP').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'sequenciaInicialNUP': `like:%${bit}%`});
            });
        }

        if (this.form.get('unidade').value) {
            andXFilter.push({'unidade.id': `eq:${this.form.get('unidade').value.id}`});
        }

        if (this.form.get('parent').value) {
            andXFilter.push({'parent.id': `eq:${this.form.get('parent').value.id}`});
        }

        if (this.form.get('unidadePai').value) {
            andXFilter.push({'unidadePai.id': `eq:${this.form.get('unidadePai').value.id}`});
        }

        if (this.form.get('municipio').value) {
            andXFilter.push({'municipio.id': `eq:${this.form.get('municipio').value.id}`});
        }

        if (this.form.get('generoSetor').value) {
            andXFilter.push({'generoSetor.id': `eq:${this.form.get('generoSetor').value.id}`});
        }

        if (this.form.get('especieSetor').value) {
            andXFilter.push({'especieSetor.id': `eq:${this.form.get('especieSetor').value.id}`});
        }

        if (this.form.get('modalidadeOrgaoCentral').value) {
            andXFilter.push({'modalidadeOrgaoCentral.id': `eq:${this.form.get('modalidadeOrgaoCentral').value.id}`});
        }

        if (this.form.get('criadoEm').value) {
            andXFilter.push({'criadoEm': `eq:${this.form.get('criadoEm').value}`});
        }

        if (this.form.get('atualizadoEm').value) {
            andXFilter.push({'atualizadoEm': `eq:${this.form.get('atualizadoEm').value}`});
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-setor-filter').close();
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
        this.emite();
    }
}
