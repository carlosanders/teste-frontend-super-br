import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Pagination} from '../../../../models';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-aviso-filter',
    templateUrl: './cdk-aviso-filter.component.html',
    styleUrls: ['./cdk-aviso-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAvisoFilterComponent{

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';
    pagination: Pagination;

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
            nome: [null],
            descricao: [null],
            ativo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
            setor: [null],
            unidade: [null],
            modalidadeOrgaoCentral: [null],
        });

        this.pagination = new Pagination()
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

        if (this.form.get('descricao').value) {
            this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'descricao': `like:%${bit}%`});
            });
        }

        if (this.form.get('setor').value) {
            andXFilter.push({'vinculacoesAvisos.setor.nome': `eq:${this.form.get('setor').value}`});
        }

        if (this.form.get('unidade').value) {
            this.form.get('unidade').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'vinculacoesAvisos.unidade.nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('modalidadeOrgaoCentral').value) {
            andXFilter.push({'vinculacoesAvisos.modalidadeOrgaoCentral.valor': `eq:${this.form.get('modalidadeOrgaoCentral').value}`});
        } 
        
        if (this.form.get('ativo').value) {
            andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
        }   

        if (this.filterCriadoEm.length > 0) {
            this.filterCriadoEm.forEach((bit) => {andXFilter.push(bit)});
        };

        if (this.filterAtualizadoEm.length > 0) {
            this.filterAtualizadoEm.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.filterApagadoEm.length > 0) {
            this.filterApagadoEm.forEach((bit) => {andXFilter.push(bit)});
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
        console.log(request);
        this._cdkSidebarService.getSidebar('cdk-aviso-filter').close();
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
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }
}
