import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-componente-digital-filter',
    templateUrl: './cdk-componente-digital-filter.component.html',
    styleUrls: ['./cdk-componente-digital-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            conteudo: [null],
            tamanho: [null],
            extensao: [null],
            processo: [null],
            editavel: [null],
            criadoPor: [null],
            criadoEm: [null],
            tipoDocumento: [null],
            juntadoPor: [null],
            juntadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['conteudo'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('extensao').value) {
            this.form.get('extensao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['extensao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('processo').value) {
            andXFilter['documento.juntadaAtual.volume.processo.id'] = `eq:${this.form.get('processo').value.id}`;
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter['documento.tipoDocumento.id'] = `eq:${this.form.get('tipoDocumento').value.id}`;
        }

        if (this.form.get('juntadoPor').value) {
            andXFilter['documento.juntadaAtual.criadoPor.id'] = `eq:${this.form.get('juntadoPor').value.id}`;
        }

        if (this.form.get('editavel').value) {
            andXFilter['editavel'] = `eq:${this.form.get('editavel').value}`;
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

