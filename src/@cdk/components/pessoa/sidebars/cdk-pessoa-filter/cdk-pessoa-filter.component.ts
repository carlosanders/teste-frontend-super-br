import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

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

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            numeroDocumentoPrincipal: [null],
            pessoaValidada: [null],
            dataNascimento: [null],
            dataObito: [null],
            nomeGenitora: [null],
            modalidadeQualificacaoPessoa: [null],
            modalidadeGeneroPessoa: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['nome'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('nomeGenitora').value) {
            this.form.get('nomeGenitora').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['nomeGenitora'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('numeroDocumentoPrincipal').value) {
            this.form.get('numeroDocumentoPrincipal').value.split(' ').map(bit => bit.replace(/[^\\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['numeroDocumentoPrincipal'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('modalidadeGeneroPessoa').value) {
            andXFilter['modalidadeGeneroPessoa.id'] = `eq:${this.form.get('modalidadeGeneroPessoa').value.id}`;
        }

        if (this.form.get('modalidadeQualificacaoPessoa').value) {
            andXFilter['modalidadeQualificacaoPessoa.id'] = `eq:${this.form.get('modalidadeQualificacaoPessoa').value.id}`;
        }

        if (this.form.get('dataNascimento').value) {
            andXFilter['dataNascimento'] = `eq:${this.form.get('dataNascimento').value.format('YYYY-MM-DD')}`;
        }

        if (this.form.get('dataObito').value) {
            andXFilter['dataObito'] = `eq:${this.form.get('dataObito').value.format('YYYY-MM-DD')}`;
        }

        if (this.form.get('criadoEm').value) {
            andXFilter['criadoEm'] = `eq:${this.form.get('criadoEm').value}`;
        }

        if (this.form.get('atualizadoEm').value) {
            andXFilter['atualizadoEm'] = `eq:${this.form.get('atualizadoEm').value}`;
        }

        if (this.form.get('criadoPor').value) {
            andXFilter['criadoPor.id'] = `eq:${this.form.get('criadoPor').value.id}`;
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter['atualizadoPor.id'] = `eq:${this.form.get('atualizadoPor').value.id}`;
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = [andXFilter];
        }

        this.selected.emit(request);
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
