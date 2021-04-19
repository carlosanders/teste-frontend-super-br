import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-vinculacao-etiqueta-filter',
    templateUrl: './cdk-vinculacao-etiqueta-filter.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaFilterComponent {

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
            conteudo: [null],
            privada: [null],
            dataHoraExpiracao: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['conteudo'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('etiqueta').value) {
            andXFilter['etiqueta.id'] = `eq:${this.form.get('etiqueta').value.id}`;
        }

        if (this.form.get('tarefa').value) {
            andXFilter['tarefa.id'] = `eq:${this.form.get('tarefa').value.id}`;
        }

        if (this.form.get('documento').value) {
            andXFilter['documento.id'] = `eq:${this.form.get('documento').value.id}`;
        }

        if (this.form.get('processo').value) {
            andXFilter['processo.id'] = `eq:${this.form.get('processo').value.id}`;
        }

        if (this.form.get('usuario').value) {
            andXFilter['usuario.id'] = `eq:${this.form.get('usuario').value.id}`;
        }

        if (this.form.get('dataHoraExpiracao').value) {
            andXFilter['dataHoraExpiracao'] = `eq:${this.form.get('dataHoraExpiracao').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-vinculacao-etiqueta-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }

}
