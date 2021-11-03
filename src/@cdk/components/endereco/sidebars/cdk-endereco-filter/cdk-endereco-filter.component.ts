import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-endereco-filter',
    templateUrl: './cdk-endereco-filter.component.html',
    styleUrls: ['./cdk-endereco-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEnderecoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            bairro: [null],
            cep: [null],
            municipio: [null],
            complemento: [null],
            logradouro: [null],
            numero: [null],
            pais: [null],
            observacao: [null],
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

        if (this.form.get('bairro').value) {
            this.form.get('bairro').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'bairro': `like:%${bit}%`});
            });
        }

        if (this.form.get('cep').value) {
            this.form.get('cep').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'cep': `like:%${bit}%`});
            });
        }

        if (this.form.get('complemento').value) {
            this.form.get('complemento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'complemento': `like:%${bit}%`});
            });
        }

        if (this.form.get('logradouro').value) {
            this.form.get('logradouro').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'logradouro': `like:%${bit}%`});
            });
        }

        if (this.form.get('numero').value) {
            this.form.get('numero').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'numero': `like:%${bit}%`});
            });
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('municipio').value) {
            andXFilter.push({'municipio.id': `eq:${this.form.get('municipio').value.id}`});
        }

        if (this.form.get('pais').value) {
            andXFilter.push({'pais.id': `eq:${this.form.get('pais').value.id}`});
        }

        if (this.form.get('pessoa').value) {
            andXFilter.push({'pessoa.id': `eq:${this.form.get('pessoa').value.id}`});
        }

        if (this.filterCriadoEm.length > 0) {
            this.filterCriadoEm.forEach((bit) => {andXFilter.push(bit);});
        }

        if (this.filterAtualizadoEm.length > 0) {
            this.filterAtualizadoEm.forEach((bit) => {andXFilter.push(bit);});
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
        this._cdkSidebarService.getSidebar('cdk-endereco-filter').close();
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
