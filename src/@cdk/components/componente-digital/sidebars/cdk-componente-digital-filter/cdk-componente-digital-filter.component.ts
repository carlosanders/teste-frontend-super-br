import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

    filterCriadoEm = [];
    filterJuntadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            conteudo: [null, [Validators.required]],
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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'conteudo': `like:%${bit}%`});
            });
        }

        if (this.form.get('extensao').value) {
            this.form.get('extensao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter.push({'extensao': `like:%${bit}%`});
            });
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'documento.juntadaAtual.volume.processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'documento.tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('juntadoPor').value) {
            andXFilter.push({'documento.juntadaAtual.criadoPor.id': `eq:${this.form.get('juntadoPor').value.id}`});
        }

        if (this.filterJuntadoEm?.length) {
            this.filterJuntadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('editavel').value) {
            andXFilter.push({'editavel': `eq:${this.form.get('editavel').value}`});
        }

        if (this.filterCriadoEm?.length) {
            this.filterCriadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
    }

    filtraJuntadoEm(value: any): void {
        this.filterJuntadoEm = value;
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

