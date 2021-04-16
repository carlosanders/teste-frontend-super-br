import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-documento-avulso-filter',
    templateUrl: './cdk-documento-avulso-filter.component.html',
    styleUrls: ['./cdk-documento-avulso-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoFilterComponent {

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
            setorOrigem: [null],
            especieDocumentoAvulso: [null],
            observacao: [null],
            urgente: [null],
            modelo: [null],
            dataHoraEncerramento: [null],
            dataHoraInicioPrazo: [null],
            dataHoraFinalPrazo: [null],
            dataHoraConclusaoPrazo: [null],
            pessoaDestino: [null],
            setorDestino: [null],
            dataHoraRemessa: [null],
            dataHoraResposta: [null],
            dataHoraReiteracao: [null],
            documentoResposta: [null],
            documentoRemessa: [null],
            usuarioResponsavel: [null],
            setorResponsavel: [null],
            usuarioResposta: [null],
            usuarioRemessa: [null],
            processo: [null],
            processoDestino: [null],
            documentoAvulsoOrigem: [null],
            tarefaOrigem: [null],
            postIt: [null],
            distribuicaoAutomatica: [null],
            livreBalanceamento: [null],
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

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['observacao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('postIt').value) {
            this.form.get('postIt').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['postIt'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('auditoriaDistribuicao').value) {
            this.form.get('auditoriaDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['auditoriaDistribuicao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter['setorOrigem.id'] = `eq:${this.form.get('setorOrigem').value.id}`;
        }

        if (this.form.get('especieDocumentoAvulso').value) {
            andXFilter['especieDocumentoAvulso.id'] = `eq:${this.form.get('especieDocumentoAvulso').value.id}`;
        }

        if (this.form.get('modelo').value) {
            andXFilter['modelo.id'] = `eq:${this.form.get('modelo').value.id}`;
        }

        if (this.form.get('pessoaDestino').value) {
            andXFilter['pessoaDestino.id'] = `eq:${this.form.get('pessoaDestino').value.id}`;
        }

        if (this.form.get('setorDestino').value) {
            andXFilter['setorDestino.id'] = `eq:${this.form.get('setorDestino').value.id}`;
        }

        if (this.form.get('documentoResposta').value) {
            andXFilter['documentoResposta.id'] = `eq:${this.form.get('documentoResposta').value.id}`;
        }

        if (this.form.get('documentoRemessa').value) {
            andXFilter['documentoRemessa.id'] = `eq:${this.form.get('documentoRemessa').value.id}`;
        }

        if (this.form.get('usuarioResponsavel').value) {
            andXFilter['usuarioResponsavel.id'] = `eq:${this.form.get('usuarioResponsavel').value.id}`;
        }

        if (this.form.get('setorResponsavel').value) {
            andXFilter['setorResponsavel.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
        }

        if (this.form.get('usuarioResposta').value) {
            andXFilter['usuarioResposta.id'] = `eq:${this.form.get('usuarioResposta').value.id}`;
        }

        if (this.form.get('usuarioRemessa').value) {
            andXFilter['usuarioRemessa.id'] = `eq:${this.form.get('usuarioRemessa').value.id}`;
        }

        if (this.form.get('processo').value) {
            andXFilter['processo.id'] = `eq:${this.form.get('processo').value.id}`;
        }

        if (this.form.get('processoDestino').value) {
            andXFilter['processoDestino.id'] = `eq:${this.form.get('processoDestino').value.id}`;
        }

        if (this.form.get('documentoAvulsoOrigem').value) {
            andXFilter['documentoAvulsoOrigem.id'] = `eq:${this.form.get('documentoAvulsoOrigem').value.id}`;
        }

        if (this.form.get('tarefaOrigem').value) {
            andXFilter['tarefaOrigem.id'] = `eq:${this.form.get('tarefaOrigem').value.id}`;
        }

        if (this.form.get('dataHoraEncerramento').value) {
            andXFilter['dataHoraEncerramento'] = `eq:${this.form.get('dataHoraEncerramento').value}`;
        }

        if (this.form.get('dataHoraInicioPrazo').value) {
            andXFilter['dataHoraInicioPrazo'] = `eq:${this.form.get('dataHoraInicioPrazo').value}`;
        }

        if (this.form.get('dataHoraFinalPrazo').value) {
            andXFilter['dataHoraFinalPrazo'] = `eq:${this.form.get('dataHoraFinalPrazo').value}`;
        }

        if (this.form.get('dataHoraRemessa').value) {
            andXFilter['dataHoraRemessa'] = `eq:${this.form.get('dataHoraRemessa').value}`;
        }

        if (this.form.get('dataHoraResposta').value) {
            andXFilter['dataHoraResposta'] = `eq:${this.form.get('dataHoraResposta').value}`;
        }

        if (this.form.get('dataHoraReiteracao').value) {
            andXFilter['dataHoraReiteracao'] = `eq:${this.form.get('dataHoraReiteracao').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
