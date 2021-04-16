import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'cdk-relatorio-filter',
    templateUrl: './cdk-relatorio-filter.component.html',
    styleUrls: ['./cdk-relatorio-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRelatorioFilterComponent {

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
            especieRelatorio: [null],
            generoRelatorio: [null],
            tipoRelatorio: [null],
            observacao: [null],
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

        if (this.form.get('generoRelatorio').value) {
            andXFilter['tipoRelatorio.especieRelatorio.generoRelatorio.id'] = `eq:${this.form.get('generoTarefa').value.id}`;
        }

        if (this.form.get('especieRelatorio').value) {
            andXFilter['tipoRelatorio.especieRelatorio.id'] = `eq:${this.form.get('especieRelatorio').value.id}`;
        }

        if (this.form.get('tipoRelatorio').value) {
            andXFilter['tipoRelatorio.id'] = `eq:${this.form.get('tipoRelatorio').value.id}`;
        }

        if (this.form.get('generoTarefa').value) {
            andXFilter['generoTarefa.id'] = `eq:${this.form.get('generoTarefa').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-especie-tarefa-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
