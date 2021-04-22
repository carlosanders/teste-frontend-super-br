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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('destinacaoMinutas').value) {
            this.form.get('destinacaoMinutas').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'destinacaoMinutas': `like:%${bit}%`});
            });
        }

        if (this.form.get('especieAtividade').value) {
            andXFilter.push({'especieAtividade.id': `eq:${this.form.get('especieAtividade').value.id}`});
        }

        if (this.form.get('setor').value) {
            andXFilter.push({'setor.id': `eq:${this.form.get('setor').value.id}`});
        }

        if (this.form.get('usuario').value) {
            andXFilter.push({'usuario.id': `eq:${this.form.get('usuario').value.id}`});
        }

        if (this.form.get('usuarioAprovacao').value) {
            andXFilter.push({'usuarioAprovacao.id': `eq:${this.form.get('usuarioAprovacao').value.id}`});
        }

        if (this.form.get('setorAprovacao').value) {
            andXFilter.push({'setorAprovacao.id': `eq:${this.form.get('setorAprovacao').value.id}`});
        }

        if (this.form.get('tarefa').value) {
            andXFilter.push({'tarefa.id': `eq:${this.form.get('tarefa').value.id}`});
        }

        if (this.form.get('documentos').value) {
            andXFilter.push({'documentos.id': `eq:${this.form.get('documentos').value.id}`});
        }

        if (this.form.get('dataHoraConclusao').value) {
            andXFilter.push({'dataHoraConclusao': `eq:${this.form.get('dataHoraConclusao').value}`});
        }

        if (this.form.get('criadoEm').value) {
            andXFilter.push({'criadoEm': `eq:${this.form.get('criadoEm').value}`});
        }

        if (this.form.get('atualizadoEm').value) {
            andXFilter.push({'atualizadoEm': `eq:${this.form.get('atualizadoEm').value}`});
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
        this._cdkSidebarService.getSidebar('cdk-atividade-filter').close();
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
        this.emite();
    }
}
