import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';


@Component({
    selector: 'cdk-tramitacao-filter',
    templateUrl: './cdk-tramitacao-filter.component.html',
    styleUrls: ['./cdk-tramitacao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTramitacaoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter.push({'setorOrigem.id': `eq:${this.form.get('setorOrigem').value.id}`});
        }

        if (this.form.get('setorDestino').value) {
            andXFilter.push({'setorDestino.id': `eq:${this.form.get('setorDestino').value.id}`});
        }

        if (this.form.get('pessoaDestino').value) {
            andXFilter.push({'pessoaDestino.id': `eq:${this.form.get('pessoaDestino').value.id}`});
        }

        if (this.form.get('usuarioRecebimento').value) {
            andXFilter.push({'usuarioRecebimento.id': `eq:${this.form.get('usuarioRecebimento').value.id}`});
        }

        if (this.form.get('dataHoraRecebimento').value) {
            andXFilter.push({'dataHoraRecebimento': `eq:${this.form.get('dataHoraRecebimento').value}`});
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
        this._cdkSidebarService.getSidebar('cdk-tramitacao-filter').close();
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
