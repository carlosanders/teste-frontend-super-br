import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-origem-dados-filter',
    templateUrl: './cdk-origem-dados-filter.component.html',
    styleUrls: ['./cdk-origem-dados-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkOrigemDadosFilterComponent {

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
            idExterno: [null],
            servico: [null],
            fonteDados: [null],
            status: [null],
            dataHoraUltimaConsulta: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('idExterno').value) {
            this.form.get('idExterno').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['idExterno'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('servico').value) {
            this.form.get('servico').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['servico'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('fonteDados').value) {
            this.form.get('fonteDados').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['fonteDados'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('status').value) {
            this.form.get('status').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['status'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('dataHoraUltimaConsulta').value) {
            andXFilter['dataHoraUltimaConsulta'] = `eq:${this.form.get('dataHoraUltimaConsulta').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-origem-dados-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
