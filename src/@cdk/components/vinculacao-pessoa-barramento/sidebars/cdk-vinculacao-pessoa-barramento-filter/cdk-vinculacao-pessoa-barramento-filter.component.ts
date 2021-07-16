import {
    ChangeDetectionStrategy,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    Component,
    Output,
    Input
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from "@cdk/components/sidebar/sidebar.service";
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-vinculacao-pessoa-barramento-filter',
    templateUrl: './cdk-vinculacao-pessoa-barramento-filter.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-barramento-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoPessoaBarramentoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterApagadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            pessoa: [null],
            repositorio: [null],
            estrutura: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
        });
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('pessoa').value) {
            andXFilter.push({'pessoa.id': `eq:${this.form.get('pessoa').value.id}`});
        }

        if (this.form.get('repositorio').value) {
            andXFilter.push({'repositorio.id': `eq:${this.form.get('repositorio').value.id}`});
        }

        if (this.form.get('nomeRepositorio').value) {
            andXFilter.push({'nomeRepositorio.id': `eq:${this.form.get('nomeRepositorio').value.id}`});
        }

        if (this.form.get('estrutura').value) {
            andXFilter.push({'estrutura.id': `eq:${this.form.get('estrutura').value.id}`});
        }

        if (this.form.get('nomeEstrutura').value) {
            andXFilter.push({'nomeEstrutura.id': `eq:${this.form.get('nomeEstrutura').value.id}`});
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

        if (this.filterApagadoEm?.length) {
            this.filterApagadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }
        
        if (this.form.get('apagadoPor').value) {
            andXFilter.push({'apagadoPor.id': `eq:${this.form.get('apagadoPor').value.id}`});
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
        this._cdkSidebarService.getSidebar('cdk-atividade-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraApagadoEm(value: any): void {
        this.filterApagadoEm = value;
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
        this.filters = {};
        this.limparFormFiltroDatas$.next(true);
        this.emite();
        this.form.reset();
    }
}

