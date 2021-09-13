import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-classificacao-filter',
    templateUrl: './cdk-classificacao-filter.component.html',
    styleUrls: ['./cdk-classificacao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkClassificacaoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @Input()
    hasInatived = false;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            modalidadeDestinacao: [null],
            prazoGuardaFaseCorrenteAno: [null],
            prazoGuardaFaseCorrenteDia: [null],
            prazoGuardaFaseCorrenteMes: [null],
            prazoGuardaFaseCorrenteEvento: [null],
            prazoGuardaFaseIntermediariaDia: [null],
            prazoGuardaFaseIntermediariaMes: [null],
            prazoGuardaFaseIntermediariaAno: [null],
            prazoGuardaFaseIntermediariaEvento: [null],
            codigo: [null],
            permissaoUso: [null],
            observacao: [null],
            parent: [null],
            ativo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
        this.form.controls.ativo.setValue("todos");
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteEvento').value) {
            this.form.get('prazoGuardaFaseCorrenteEvento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseCorrenteEvento': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaEvento').value) {
            this.form.get('prazoGuardaFaseIntermediariaEvento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseIntermediariaEvento': `like:%${bit}%`});
            });
        }

        if (this.form.get('codigo').value) {
            this.form.get('codigo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'codigo': `like:%${bit}%`});
            });
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteAno').value) {
            this.form.get('prazoGuardaFaseCorrenteAno').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseCorrenteAno': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteMes').value) {
            this.form.get('prazoGuardaFaseCorrenteMes').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseCorrenteMes': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteDia').value) {
            this.form.get('prazoGuardaFaseCorrenteDia').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseCorrenteDia': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaAno').value) {
            this.form.get('prazoGuardaFaseIntermediariaAno').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseIntermediariaAno': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaMes').value) {
            this.form.get('prazoGuardaFaseIntermediariaMes').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseIntermediariaMes': `like:%${bit}%`});
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaDia').value) {
            this.form.get('prazoGuardaFaseIntermediariaDia').value.split(' ').filter(bit => !!bit && bit.length >= 1).forEach((bit) => {
                andXFilter.push({'prazoGuardaFaseIntermediariaDia': `like:%${bit}%`});
            });
        }

        if (this.form.get('ativo').value) {
            if(this.form.get('ativo').value !== 'todos') {
                andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
            }
            else {
                delete andXFilter['ativo'];
            }
        }

        if (this.form.get('parent').value) {
            andXFilter.push({'parent.id': `eq:${this.form.get('parent').value.id}`});
        }

        if (this.form.get('modalidadeDestinacao').value) {
            andXFilter.push({'modalidadeDestinacao.id': `eq:${this.form.get('modalidadeDestinacao').value.id}`});
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

        const contexto = this.hasInatived ?  {isAdmin: true} : {isAdmin: false};

        const request = {
            filters: {},
            contexto: contexto
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-classificacao-filter').close();
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
        this.resetarFormulario();
        this.emite();
    }

    resetarFormulario(): void {
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this.form.controls.ativo.setValue("todos");
    }
}

