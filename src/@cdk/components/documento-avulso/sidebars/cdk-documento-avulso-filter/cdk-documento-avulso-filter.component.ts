import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';
import { Pagination } from '@cdk/models';

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
    pagination: Pagination;

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataHoraEncerramento = [];
    filterDataHoraInicioPrazo = [];
    filterDataHoraFinalPrazo = [];
    filterDataHoraConclusaoPrazo = [];
    filterDataHoraRemessa = [];
    filterDataHoraResposta = [];
    filterDataHoraReiteracao = [];




    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        
        if (this.form.get('setorOrigem').value) {
            andXFilter.push({'setorOrigem.id': `eq:${this.form.get('setorOrigem').value.id}`});
        }

        if (this.form.get('especieDocumentoAvulso').value) {
            andXFilter.push({'especieDocumentoAvulso.id': `eq:${this.form.get('especieDocumentoAvulso').value.id}`});
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('urgente').value) {
            andXFilter.push({'urgente': `eq:${this.form.get('urgente').value}`});
        }  

        if (this.form.get('modelo').value) {
            andXFilter.push({'modelo.id': `eq:${this.form.get('modelo').value.id}`});
        }

        if (this.form.get('pessoaDestino').value) {
            andXFilter.push({'pessoaDestino.id': `eq:${this.form.get('pessoaDestino').value.id}`});
        }

        if (this.form.get('setorDestino').value) {
            andXFilter.push({'setorDestino.id': `eq:${this.form.get('setorDestino').value.id}`});
        }

        if (this.form.get('documentoResposta').value) {
            andXFilter.push({'documentoResposta.id': `eq:${this.form.get('documentoResposta').value.id}`});
        }

        if (this.form.get('documentoRemessa').value) {
            andXFilter.push({'documentoRemessa.id': `eq:${this.form.get('documentoRemessa').value.id}`});
        }

        if (this.form.get('usuarioResponsavel').value) {
            andXFilter.push({'usuarioResponsavel.id': `eq:${this.form.get('usuarioResponsavel').value.id}`});
        }

        if (this.form.get('setorResponsavel').value) {
            andXFilter.push({'setorResponsavel.id': `eq:${this.form.get('setorResponsavel').value.id}`});
        }

        if (this.form.get('usuarioResposta').value) {
            andXFilter.push({'usuarioResposta.id': `eq:${this.form.get('usuarioResposta').value.id}`});
        }

        if (this.form.get('usuarioRemessa').value) {
            andXFilter.push({'usuarioRemessa.id': `eq:${this.form.get('usuarioRemessa').value.id}`});
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('processoDestino').value) {
            andXFilter.push({'processoDestino.id': `eq:${this.form.get('processoDestino').value.id}`});
        }

        if (this.form.get('documentoAvulsoOrigem').value) {
            andXFilter.push({'documentoAvulsoOrigem.id': `eq:${this.form.get('documentoAvulsoOrigem').value.id}`});
        }

        if (this.form.get('tarefaOrigem').value) {
            andXFilter.push({'tarefaOrigem.id': `eq:${this.form.get('tarefaOrigem').value.id}`});
        }

        if (this.form.get('postIt').value) {
            this.form.get('postIt').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'postIt': `like:%${bit}%`});
            });
        }

        if (this.form.get('livreBalanceamento').value) {
            this.form.get('livreBalanceamento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'livreBalanceamento': `like:%${bit}%`});
            });
        }

        if (this.form.get('auditoriaDistribuicao').value) {
            this.form.get('auditoriaDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'auditoriaDistribuicao': `like:%${bit}%`});
            });
        }

        if (this.form.get('tipoDistribuicao').value) {
            this.form.get('tipoDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'tipoDistribuicao': `like:%${bit}%`});
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        if (this.filterDataHoraEncerramento?.length) {
            this.filterDataHoraEncerramento.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraInicioPrazo?.length) {
            this.filterDataHoraInicioPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraFinalPrazo?.length) {
            this.filterDataHoraFinalPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraConclusaoPrazo?.length) {
            this.filterDataHoraConclusaoPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraRemessa?.length) {
            this.filterDataHoraRemessa.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraResposta?.length) {
            this.filterDataHoraResposta.forEach((filter) => {
                andXFilter.push(filter);
            });
        }
        if (this.filterDataHoraReiteracao?.length) {
            this.filterDataHoraReiteracao.forEach((filter) => {
                andXFilter.push(filter);
            });
        }
        if (this.filterCriadoEm?.length) {
            this.filterCriadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }
        if (this.filterAtualizadoEm?.length) {
            this.filterAtualizadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }        

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-filter').close();
    }

    filtraDataHoraEncerramento(value: any): void {
        this.filterDataHoraEncerramento = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraInicioPrazo(value: any): void {
        this.filterDataHoraInicioPrazo = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraConclusaoPrazo(value: any): void {
        this.filterDataHoraConclusaoPrazo = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraFinalPrazo(value: any): void {
        this.filterDataHoraFinalPrazo = value;
        this.limparFormFiltroDatas$.next(false);
    }
    
    filtraDataHoraRemessa(value: any): void {
        this.filterDataHoraRemessa = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraResposta(value: any): void {
        this.filterDataHoraResposta = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraReiteracao(value: any): void {
        this.filterDataHoraReiteracao = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
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
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }
}
