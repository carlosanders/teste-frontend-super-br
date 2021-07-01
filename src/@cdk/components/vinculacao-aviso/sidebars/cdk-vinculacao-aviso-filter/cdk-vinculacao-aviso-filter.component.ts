import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '@cdk/models';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-vinculacao-aviso-filter',
    templateUrl: './cdk-vinculacao-aviso-filter.component.html',
    styleUrls: ['./cdk-vinculacao-aviso-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoAvisoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';

    @Input()
    modalidadeOrgaoCentralPagination: Pagination;

    @Input()
    avisoPagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

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
            aviso: [null],
            especieSetor: [null],
            setor: [null],
            usuario: [null],
            modalidadeOrgaoCentral: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
        });

        this.modalidadeOrgaoCentralPagination = new Pagination();
        this.avisoPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();
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

        if (this.form.get('destinacaoMinutas').value) {
            this.form.get('destinacaoMinutas').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'destinacaoMinutas': `like:%${bit}%`});
            });
        }

        if (this.form.get('especieAtividade').value) {
            andXFilter.push({'especieAtividade.id': `eq:${this.form.get('especieAtividade').value.id}`});
        }

        if (this.form.get('setor').value) {
            andXFilter.push({'setor.id': `eq:${this.form.get('setor').value.id}`});
        }

        if (this.form.get('usuario').value) {
            andXFilter.push({'usuario.id': `eq:${this.form.get('usuario').value.id}`});
        }

        if (this.form.get('usuarioAprovacao').value) {
            andXFilter.push({'usuarioAprovacao.id': `eq:${this.form.get('usuarioAprovacao').value.id}`});
        }

        if (this.form.get('setorAprovacao').value) {
            andXFilter.push({'setorAprovacao.id': `eq:${this.form.get('setorAprovacao').value.id}`});
        }

        if (this.form.get('tarefa').value) {
            andXFilter.push({'tarefa.id': `eq:${this.form.get('tarefa').value.id}`});
        }

        if (this.form.get('documentos').value) {
            andXFilter.push({'documentos.id': `eq:${this.form.get('documentos').value.id}`});
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
        this.emite();
        this.limparFormFiltroDatas$.next(true);
        this.form.reset();
    }
}
