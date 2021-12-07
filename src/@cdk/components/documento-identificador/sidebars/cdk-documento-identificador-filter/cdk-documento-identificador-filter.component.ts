import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';
import { Pagination } from '@cdk/models';

@Component({
    selector: 'cdk-documento-identificador-filter',
    templateUrl: './cdk-documento-identificador-filter.component.html',
    styleUrls: ['./cdk-documento-identificador-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoIdentificadorFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';
    pagination: Pagination;

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataEmissao = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            codigoDocumento: [null],
            emissorDocumento: [null],
            dataEmissao: [null],
            modalidadeDocumentoIdentificador: [null],
            pessoa: [null],
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

        if (this.form.get('codigoDocumento').value) {
            this.form.get('codigoDocumento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'codigoDocumento': `like:%${bit}%`});
            });
        }

        if (this.form.get('emissorDocumento').value) {
            this.form.get('emissorDocumento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'emissorDocumento': `like:%${bit}%`});
            });
        }

        if (this.form.get('modalidadeDocumentoIdentificador').value) {
            andXFilter.push({'modalidadeDocumentoIdentificador.id': `eq:${this.form.get('modalidadeDocumentoIdentificador').value.id}`});
        }

        if (this.form.get('pessoa').value) {
            andXFilter.push({'pessoa.id': `eq:${this.form.get('pessoa').value.id}`});
        }

        if (this.filterDataEmissao?.length) {
            this.filterDataEmissao.forEach((filter) => {
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
        this._cdkSidebarService.getSidebar('cdk-documento-identificador-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataEmissao(value: any): void {
        this.filterDataEmissao = value;
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
