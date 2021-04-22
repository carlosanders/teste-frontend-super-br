import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-assinatura-filter',
    templateUrl: './cdk-assinatura-filter.component.html',
    styleUrls: ['./cdk-assinatura-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssinaturaFilterComponent {

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
            algoritmoHash: [null],
            assinatura: [null],
            cadeiaCertificadoPEM: [null],
            cadeiaCertificadoPkiPath: [null],
            dataHoraAssinatura: [null],
            componenteDigital: [null],
            origemDados: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('algoritmoHash').value) {
            this.form.get('algoritmoHash').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['algoritmoHash'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('assinatura').value) {
            this.form.get('assinatura').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['assinatura'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('cadeiaCertificadoPEM').value) {
            this.form.get('cadeiaCertificadoPEM').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['cadeiaCertificadoPEM'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('cadeiaCertificadoPkiPath').value) {
            this.form.get('cadeiaCertificadoPkiPath').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['cadeiaCertificadoPkiPath'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('assinatura').value) {
            this.form.get('assinatura').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['assinatura'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('componenteDigital').value) {
            andXFilter['componenteDigital.id'] = `eq:${this.form.get('componenteDigital').value.id}`;
        }

        if (this.form.get('origemDados').value) {
            andXFilter['origemDados.id'] = `eq:${this.form.get('origemDados').value.id}`;
        }

        if (this.form.get('dataHoraAssinatura').value) {
            andXFilter['dataHoraAssinatura'] = `eq:${this.form.get('dataHoraAssinatura').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-assinatura-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
