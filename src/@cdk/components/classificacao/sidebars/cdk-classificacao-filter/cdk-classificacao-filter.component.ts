import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

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
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['nome'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteEvento').value) {
            this.form.get('prazoGuardaFaseCorrenteEvento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseCorrenteEvento'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaEvento').value) {
            this.form.get('prazoGuardaFaseIntermediariaEvento').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseIntermediariaEvento'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('codigo').value) {
            this.form.get('codigo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['codigo'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['observacao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteAno').value) {
            this.form.get('prazoGuardaFaseCorrenteAno').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseCorrenteAno'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteMes').value) {
            this.form.get('prazoGuardaFaseCorrenteMes').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseCorrenteMes'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseCorrenteDia').value) {
            this.form.get('prazoGuardaFaseCorrenteDia').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseCorrenteDia'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaAno').value) {
            this.form.get('prazoGuardaFaseIntermediariaAno').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseIntermediariaAno'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaMes').value) {
            this.form.get('prazoGuardaFaseIntermediariaMes').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseIntermediariaMes'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('prazoGuardaFaseIntermediariaDia').value) {
            this.form.get('prazoGuardaFaseIntermediariaDia').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['prazoGuardaFaseIntermediariaDia'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('parent').value) {
            andXFilter['parent.id'] = `eq:${this.form.get('parent').value.id}`;
        }

        if (this.form.get('modalidadeDestinacao').value) {
            andXFilter['modalidadeDestinacao.id'] = `eq:${this.form.get('modalidadeDestinacao').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-classificacao-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}

