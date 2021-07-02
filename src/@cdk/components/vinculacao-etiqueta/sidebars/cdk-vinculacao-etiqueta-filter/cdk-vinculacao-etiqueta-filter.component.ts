import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

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

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataHoraExpiracao = [];
    filterApagadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'conteudo': `like:%${bit}%`});
            });
        }

        if (this.form.get('etiqueta').value) {
            andXFilter.push({'etiqueta.id': `eq:${this.form.get('etiqueta').value.id}`});
        }

        if (this.form.get('tarefa').value) {
            andXFilter.push({'tarefa.id': `eq:${this.form.get('tarefa').value.id}`});
        }

        if (this.form.get('documento').value) {
            andXFilter.push({'documento.id': `eq:${this.form.get('documento').value.id}`});
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('usuario').value) {
            andXFilter.push({'usuario.id': `eq:${this.form.get('usuario').value.id}`});
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

        if (this.filterApagadoEm?.length) {
            this.filterApagadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraExpiracao?.length) {
            this.filterDataHoraExpiracao.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        if (this.form.get('apagadoPor').value) {
            andXFilter.push({'apagadoPor.id': `eq:${this.form.get('apagadoPor').value.id}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-vinculacao-etiqueta-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraExpiracao(value: any): void {
        this.filterDataHoraExpiracao = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraApagadoEm(value: any): void {
        this.filterApagadoEm = value;
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
