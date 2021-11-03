import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-sigilo-filter',
    templateUrl: './cdk-sigilo-filter.component.html',
    styleUrls: ['./cdk-sigilo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSigiloFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataHoraInicioSigilo = [];
    filterDataHoraValidadeSigilo = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();


    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            desclassificado: [null],
            observacao: [null],
            codigoIndexacao: [null],
            fundamentoLegal: [null],
            razoesClassificacaoSigilo: [null],
            dataHoraInicioSigilo: [null],
            dataHoraValidadeSigilo: [null],
            nivelAcesso: [null],
            modalidadeCategoriaSigilo: [null],
            tipoSigilo: [null],
            processo: [null],
            documento: [null],
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

        if (this.form.get('codigoIndexacao').value) {
            this.form.get('codigoIndexacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'codigoIndexacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('fundamentoLegal').value) {
            this.form.get('fundamentoLegal').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'fundamentoLegal': `like:%${bit}%`});
            });
        }

        if (this.form.get('razoesClassificacaoSigilo').value) {
            this.form.get('razoesClassificacaoSigilo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'razoesClassificacaoSigilo': `like:%${bit}%`});
            });
        }

        if (this.form.get('nivelAcesso').value) {
            this.form.get('nivelAcesso').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nivelAcesso': `like:%${bit}%`});
            });
        }

        if (this.form.get('modalidadeCategoriaSigilo').value) {
            andXFilter.push({'modalidadeCategoriaSigilo.id': `eq:${this.form.get('modalidadeCategoriaSigilo').value.id}`});
        }

        if (this.form.get('tipoSigilo').value) {
            andXFilter.push({'tipoSigilo.id': `eq:${this.form.get('tipoSigilo').value.id}`});
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('documento').value) {
            andXFilter.push({'documento.id': `eq:${this.form.get('documento').value.id}`});
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

        if (this.filterDataHoraValidadeSigilo?.length) {
            this.filterDataHoraValidadeSigilo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraInicioSigilo?.length) {
            this.filterDataHoraInicioSigilo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        if (this.form.get('desclassificado').value) {
            if(this.form.get('desclassificado').value !== 'todos') {
                andXFilter.push({'desclassificado': `eq:${this.form.get('desclassificado').value}`});
            }
            else {
                delete andXFilter['desclassificado'];
            }
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-sigilo-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraInicioSigilo(value: any): void {
        this.filterDataHoraValidadeSigilo = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraValidadeSigilo(value: any): void {
        this.filterDataHoraValidadeSigilo = value;
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

