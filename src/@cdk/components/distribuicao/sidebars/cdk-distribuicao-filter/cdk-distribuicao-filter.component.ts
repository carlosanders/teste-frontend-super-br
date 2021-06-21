import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-distribuicao-filter',
    templateUrl: './cdk-distribuicao-filter.component.html',
    styleUrls: ['./cdk-distribuicao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDistribuicaoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            tarefa: [null],
            documentoAvulso: [null],
            dataHoraFinalPrazo: [null],
            usuarioAnterior: [null],
            usuarioPosterior: [null],
            setorAnterior: [null],
            setorPosterior: [null],
            auditoriaDistribuicao: [null],
            tipoDistribuicao: [null],
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

        if (this.form.get('auditoriaDistribuicao').value) {
            this.form.get('auditoriaDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'auditoriaDistribuicao': `like:%${bit}%`});
            });
        }

        if (this.form.get('tipoDistribuicao').value) {
            this.form.get('tipoDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'tipoDistribuicao': `like:%${bit}%`});
            });
        }

        if (this.form.get('tarefa').value) {
            andXFilter.push({'tarefa.id': `eq:${this.form.get('tarefa').value.id}`});
        }

        if (this.form.get('documentoAvulso').value) {
            andXFilter.push({'documentoAvulso.id': `eq:${this.form.get('documentoAvulso').value.id}`});
        }

        if (this.form.get('usuarioAnterior').value) {
            andXFilter.push({'usuarioAnterior.id': `eq:${this.form.get('usuarioAnterior').value.id}`});
        }

        if (this.form.get('usuarioPosterior').value) {
            andXFilter.push({'usuarioPosterior.id': `eq:${this.form.get('usuarioPosterior').value.id}`});
        }

        if (this.form.get('setorAnterior').value) {
            andXFilter.push({'setorAnterior.id': `eq:${this.form.get('setorAnterior').value.id}`});
        }

        if (this.form.get('setorPosterior').value) {
            andXFilter.push({'setorPosterior.id': `eq:${this.form.get('setorPosterior').value.id}`});
        }

        if (this.form.get('dataHoraFinalPrazo').value) {
            andXFilter.push({'dataHoraFinalPrazo': `eq:${this.form.get('dataHoraFinalPrazo').value}`});
        }

        if (this.filterCriadoEm.length > 0) {
            andXFilter.push(this.filterCriadoEm[0]);
        };

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
        this._cdkSidebarService.getSidebar('cdk-distribuicao-filter').close();
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
