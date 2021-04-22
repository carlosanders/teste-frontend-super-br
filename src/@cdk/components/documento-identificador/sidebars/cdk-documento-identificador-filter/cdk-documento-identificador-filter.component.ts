import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-documento-identificador-filter',
    templateUrl: './cdk-documento-identificador-filter.component.html',
    styleUrls: ['./cdk-documento-identificador-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoIdentificadorFilterComponent {

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
            codigoDocumento: [null],
            emissorDocumento: [null],
            dataEmissao: [null],
            modalidadeDocumentoIdentificador: [null],
            origemDados: [null],
            pessoa: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('codigoDocumento').value) {
            this.form.get('codigoDocumento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['codigoDocumento'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('emissorDocumento').value) {
            this.form.get('emissorDocumento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['emissorDocumento'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('modalidadeDocumentoIdentificador').value) {
            andXFilter['modalidadeDocumentoIdentificador.id'] = `eq:${this.form.get('modalidadeDocumentoIdentificador').value.id}`;
        }

        if (this.form.get('origemDados').value) {
            andXFilter['origemDados.id'] = `eq:${this.form.get('origemDados').value.id}`;
        }

        if (this.form.get('pessoa').value) {
            andXFilter['pessoa.id'] = `eq:${this.form.get('pessoa').value.id}`;
        }

        if (this.form.get('dataEmissao').value) {
            andXFilter['dataEmissao'] = `eq:${this.form.get('dataEmissao').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-documento-identificador-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
