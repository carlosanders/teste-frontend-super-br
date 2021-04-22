import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-documento-filter',
    templateUrl: './cdk-documento-filter.component.html',
    styleUrls: ['./cdk-documento-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoFilterComponent {

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
            numeroFolhas: [null],
            dataHoraProducao: [null],
            outroNumero: [null],
            semEfeito: [null],
            localizadorOriginal: [null],
            localProducao: [null],
            autor: [null],
            processoOrigem: [null],
            documentoOrigem: [null],
            redator: [null],
            destinatario: [null],
            procedencia: [null],
            tipoDocumento: [null],
            descricaoOutros: [null],
            observacao: [null],
            copia: [null],
            setorOrigem: [null],
            tarefaOrigem: [null],
            origemDados: [null],
            modelo: [null],
            juntadaAtual: [null],
            repositorio: [null],
            documentoAvulsoRemessa: [null],
            vinculacaoDocumentoPrincipal: [null],
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

        if (this.form.get('descricaoOutros').value) {
            this.form.get('descricaoOutros').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'descricaoOutros': `like:%${bit}%`});
            });
        }

        if (this.form.get('outroNumero').value) {
            this.form.get('outroNumero').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'outroNumero': `like:%${bit}%`});
            });
        }

        if (this.form.get('redator').value) {
            this.form.get('redator').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'redator': `like:%${bit}%`});
            });
        }

        if (this.form.get('destinatario').value) {
            this.form.get('destinatario').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'destinatario': `like:%${bit}%`});
            });
        }

        if (this.form.get('localizadorOriginal').value) {
            this.form.get('localizadorOriginal').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'localizadorOriginal': `like:%${bit}%`});
            });
        }

        if (this.form.get('localProducao').value) {
            this.form.get('localProducao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'localProducao': `like:%${bit}%`});
            });
        }

        if (this.form.get('autor').value) {
            this.form.get('autor').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'autor': `like:%${bit}%`});
            });
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('numeroFolhas').value) {
            this.form.get('numeroFolhas').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'numeroFolhas': `like:%${bit}%`});
            });
        }

        if (this.form.get('processoOrigem').value) {
            andXFilter.push({'processoOrigem.id': `eq:${this.form.get('processoOrigem').value.id}`});
        }

        if (this.form.get('documentoOrigem').value) {
            andXFilter.push({'documentoOrigem.id': `eq:${this.form.get('documentoOrigem').value.id}`});
        }

        if (this.form.get('procedencia').value) {
            andXFilter.push({'procedencia.id': `eq:${this.form.get('procedencia').value.id}`});
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter.push({'setorOrigem.id': `eq:${this.form.get('setorOrigem').value.id}`});
        }

        if (this.form.get('tarefaOrigem').value) {
            andXFilter.push({'tarefaOrigem.id': `eq:${this.form.get('tarefaOrigem').value.id}`});
        }

        if (this.form.get('juntadaAtual').value) {
            andXFilter.push({'juntadaAtual.id': `eq:${this.form.get('juntadaAtual').value.id}`});
        }

        if (this.form.get('origemDados').value) {
            andXFilter.push({'origemDados.id': `eq:${this.form.get('origemDados').value.id}`});
        }

        if (this.form.get('documentoAvulsoRemessa').value) {
            andXFilter.push({'documentoAvulsoRemessa.id': `eq:${this.form.get('documentoAvulsoRemessa').value.id}`});
        }

        if (this.form.get('modelo').value) {
            andXFilter.push({'modelo.id': `eq:${this.form.get('modelo').value.id}`});
        }

        if (this.form.get('repositorio').value) {
            andXFilter.push({'repositorio.id': `eq:${this.form.get('repositorio').value.id}`});
        }

        if (this.form.get('dataHoraProducao').value) {
            andXFilter.push({'dataHoraProducao': `eq:${this.form.get('dataHoraProducao').value}`});
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
        this._cdkSidebarService.getSidebar('cdk-documento-filter').close();
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
