import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-atividade-filter',
    templateUrl: './cdk-atividade-filter.component.html',
    styleUrls: ['./cdk-atividade-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAtividadeFilterComponent {

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
            dataHoraConclusao: [null],
            observacao: [null],
            destinacaoMinutas: [null],
            especieAtividade: [null],
            setor: [null],
            usuario: [null],
            usuarioAprovacao: [null],
            setorAprovacao: [null],
            tarefa: [null],
            documentos: [null],
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

        if (this.form.get('destinacaoMinutas').value) {
            this.form.get('destinacaoMinutas').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['destinacaoMinutas'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('especieAtividade').value) {
            andXFilter['especieAtividade.id'] = `eq:${this.form.get('especieAtividade').value.id}`;
        }

        if (this.form.get('setor').value) {
            andXFilter['setor.id'] = `eq:${this.form.get('setor').value.id}`;
        }

        if (this.form.get('usuario').value) {
            andXFilter['usuario.id'] = `eq:${this.form.get('usuario').value.id}`;
        }

        if (this.form.get('usuarioAprovacao').value) {
            andXFilter['usuarioAprovacao.id'] = `eq:${this.form.get('usuarioAprovacao').value.id}`;
        }

        if (this.form.get('setorAprovacao').value) {
            andXFilter['setorAprovacao.id'] = `eq:${this.form.get('setorAprovacao').value.id}`;
        }

        if (this.form.get('tarefa').value) {
            andXFilter['tarefa.id'] = `eq:${this.form.get('tarefa').value.id}`;
        }

        if (this.form.get('documentos').value) {
            andXFilter['documentos.id'] = `eq:${this.form.get('documentos').value.id}`;
        }

        if (this.form.get('dataHoraConclusao').value) {
            andXFilter['dataHoraConclusao'] = `eq:${this.form.get('dataHoraConclusao').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-atividade-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
