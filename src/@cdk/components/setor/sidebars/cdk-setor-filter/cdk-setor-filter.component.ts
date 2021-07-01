import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

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

    @Input()
    hasInatived = false;

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterApagadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

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
            ativo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
        });
        this.form.controls.ativo.setValue("todos");
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

        if (this.form.get('ativo').value) {
            if(this.form.get('ativo').value !== 'todos') {
                andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
            }
            else {
                delete andXFilter['ativo'];
            }
        }

        if (this.filterCriadoEm?.length) {
            this.filterCriadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterAtualizadoEm?.length) {
            this.filterAtualizadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterApagadoEm?.length) {
            this.filterApagadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }
        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        if (this.form.get('apagadoPor').value) {
            andXFilter.push({'apagadoPor.id': `eq:${this.form.get('apagadoPor').value.id}`});
        }

        const contexto = this.hasInatived ?  {isAdmin: true} : {isAdmin: false};

        const request = {
            filters: {},
            contexto: contexto
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-setor-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraApagadoEm(value: any): void {
        this.filterApagadoEm = value;
        this.limparFormFiltroDatas$.next(false);
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
        this.resetarFormulario();
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }

    resetarFormulario(): void {
        this.form.reset();
        this.form.controls.ativo.setValue("todos");
    }
}
