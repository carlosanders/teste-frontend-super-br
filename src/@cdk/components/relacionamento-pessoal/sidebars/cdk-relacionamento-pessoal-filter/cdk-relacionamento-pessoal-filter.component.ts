import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-relacionamento-pessoal-filter',
    templateUrl: './cdk-relacionamento-pessoal-filter.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRelacionamentoPessoalFilterComponent {

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
            pessoa: [null],
            pessoaRelacionada: [null],
            modalidadeRelacionamentoPessoal: [null],
            origemDados: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('pessoa').value) {
            andXFilter['pessoa.id'] = `eq:${this.form.get('pessoa').value.id}`;
        }

        if (this.form.get('pessoaRelacionada').value) {
            andXFilter['pessoaRelacionada.id'] = `eq:${this.form.get('pessoaRelacionada').value.id}`;
        }

        if (this.form.get('modalidadeRelacionamentoPessoal').value) {
            andXFilter['modalidadeRelacionamentoPessoal.id'] = `eq:${this.form.get('modalidadeRelacionamentoPessoal').value.id}`;
        }

        if (this.form.get('origemDados').value) {
            andXFilter['origemDados.id'] = `eq:${this.form.get('origemDados').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-relacionamento-pessoal-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}

