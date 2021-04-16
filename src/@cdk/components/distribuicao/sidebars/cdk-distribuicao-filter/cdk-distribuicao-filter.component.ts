import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-distribuicao-filter',
    templateUrl: './cdk-distribuicao-filter.component.html',
    styleUrls: ['./cdk-distribuicao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDistribuicaoFilterComponent {

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
            tarefa: [null],
            documentoAvulso: [null],
            dataHoraFinalPrazo: [null],
            usuarioAnterior: [null],
            usuarioPosterior: [null],
            setorAnterior: [null],
            setorPosterior: [null],
            auditoriaDistribuicao: [null],
            tipoDistribuicao: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('auditoriaDistribuicao').value) {
            this.form.get('auditoriaDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['auditoriaDistribuicao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('tipoDistribuicao').value) {
            this.form.get('tipoDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['tipoDistribuicao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('tarefa').value) {
            andXFilter['tarefa.id'] = `eq:${this.form.get('tarefa').value.id}`;
        }

        if (this.form.get('documentoAvulso').value) {
            andXFilter['documentoAvulso.id'] = `eq:${this.form.get('documentoAvulso').value.id}`;
        }

        if (this.form.get('usuarioAnterior').value) {
            andXFilter['usuarioAnterior.id'] = `eq:${this.form.get('usuarioAnterior').value.id}`;
        }

        if (this.form.get('usuarioPosterior').value) {
            andXFilter['usuarioPosterior.id'] = `eq:${this.form.get('usuarioPosterior').value.id}`;
        }

        if (this.form.get('setorAnterior').value) {
            andXFilter['setorAnterior.id'] = `eq:${this.form.get('setorAnterior').value.id}`;
        }

        if (this.form.get('setorPosterior').value) {
            andXFilter['setorPosterior.id'] = `eq:${this.form.get('setorPosterior').value.id}`;
        }

        if (this.form.get('dataHoraFinalPrazo').value) {
            andXFilter['dataHoraFinalPrazo'] = `eq:${this.form.get('dataHoraFinalPrazo').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-distribuicao-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
