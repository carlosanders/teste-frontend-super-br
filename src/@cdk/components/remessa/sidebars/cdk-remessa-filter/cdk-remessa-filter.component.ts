import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-remessa-filter',
    templateUrl: './cdk-remessa-filter.component.html',
    styleUrls: ['./cdk-remessa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRemessaFilterComponent {

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
            observacao: [null],
            urgente: [null],
            dataHoraRecebimento: [null],
            processo: [null],
            setorOrigem: [null],
            setorDestino: [null],
            pessoaDestino: [null],
            usuarioRecebimento: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['observacao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('processo').value) {
            andXFilter['processo.id'] = `eq:${this.form.get('processo').value.id}`;
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter['setorOrigem.id'] = `eq:${this.form.get('setorOrigem').value.id}`;
        }

        if (this.form.get('setorDestino').value) {
            andXFilter['setorDestino.id'] = `eq:${this.form.get('setorDestino').value.id}`;
        }

        if (this.form.get('pessoaDestino').value) {
            andXFilter['pessoaDestino.id'] = `eq:${this.form.get('pessoaDestino').value.id}`;
        }

        if (this.form.get('usuarioRecebimento').value) {
            andXFilter['usuarioRecebimento.id'] = `eq:${this.form.get('usuarioRecebimento').value.id}`;
        }

        if (this.form.get('dataHoraRecebimento').value) {
            andXFilter['dataHoraRecebimento'] = `eq:${this.form.get('dataHoraRecebimento').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-remessa-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
