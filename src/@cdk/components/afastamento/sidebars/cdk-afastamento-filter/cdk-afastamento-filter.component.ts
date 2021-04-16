import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '@cdk/models';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-afastamento-filter',
    templateUrl: './cdk-afastamento-filter.component.html',
    styleUrls: ['./cdk-afastamento-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAfastamentoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    colaboradorPagination: Pagination;

    form: FormGroup;

    @Input()
    mode = 'list';

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            modalidadeAfastamento: [null],
            colaborador: [null],
            dataInicio: [null],
            dataInicioBloqueio: [null],
            dataFim: [null],
            dataFimBloqueio: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('colaborador').value) {
            andXFilter['colaborador.id'] = `eq:${this.form.get('colaborador').value.id}`;
        }

        if (this.form.get('modalidadeAfastamento').value) {
            andXFilter['modalidadeAfastamento.id'] = `eq:${this.form.get('modalidadeAfastamento').value.id}`;
        }

        if (this.form.get('dataInicio').value) {
            andXFilter['dataInicio'] = `eq:${this.form.get('dataInicio').value}`;
        }

        if (this.form.get('dataInicioBloqueio').value) {
            andXFilter['dataInicioBloqueio'] = `eq:${this.form.get('dataInicioBloqueio').value}`;
        }

        if (this.form.get('dataFim').value) {
            andXFilter['dataFim'] = `eq:${this.form.get('dataFim').value}`;
        }

        if (this.form.get('dataFimBloqueio').value) {
            andXFilter['dataFimBloqueio'] = `eq:${this.form.get('dataFimBloqueio').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-afastamento-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}

