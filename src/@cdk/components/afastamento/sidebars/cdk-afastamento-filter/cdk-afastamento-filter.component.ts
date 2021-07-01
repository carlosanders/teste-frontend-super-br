import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '@cdk/models';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';


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

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataInicio = [];
    filterDataInicioBloqueio = [];
    filterFim = [];
    filterFimBloqueio = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

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
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('colaborador').value) {
            andXFilter.push({'colaborador.id': `eq:${this.form.get('colaborador').value.id}`});
        }

        if (this.form.get('modalidadeAfastamento').value) {
            andXFilter.push({'modalidadeAfastamento.id': `eq:${this.form.get('modalidadeAfastamento').value.id}`});
        }

        if (this.filterDataInicio?.length) {
            this.filterDataInicio.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataInicioBloqueio?.length) {
            this.filterDataInicioBloqueio.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterFim?.length) {
            this.filterFim.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterFimBloqueio?.length) {
            this.filterFimBloqueio.forEach((filter) => {
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
        this._cdkSidebarService.getSidebar('cdk-afastamento-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataInicio(value: any): void {
        this.filterDataInicio = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataInicioBloqueio(value: any): void {
        this.filterDataInicio = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraFim(value: any): void {
        this.filterFim = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraFimBloqueio(value: any): void {
        this.filterFimBloqueio = value;
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

