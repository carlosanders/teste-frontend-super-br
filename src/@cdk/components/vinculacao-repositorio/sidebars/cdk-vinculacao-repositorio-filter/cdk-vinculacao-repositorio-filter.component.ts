import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-repositorio-filter',
    templateUrl: './cdk-vinculacao-repositorio-filter.component.html',
    styleUrls: ['./cdk-vinculacao-repositorio-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoRepositorioFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    modalidadeOrgaoCentralPagination: Pagination;

    @Input()
    repositorioPagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    mode = 'list';

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            repositorio: [null],
            especieSetor: [null],
            setor: [null],
            usuario: [null],
            modalidadeOrgaoCentral: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });

        this.modalidadeOrgaoCentralPagination = new Pagination();
        this.repositorioPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('repositorio').value) {
            andXFilter['repositorio.id'] = `eq:${this.form.get('repositorio').value.id}`;
        }

        if (this.form.get('especieSetor').value) {
            andXFilter['especieSetor.id'] = `eq:${this.form.get('especieSetor').value.id}`;
        }

        if (this.form.get('setor').value) {
            andXFilter['setor.id'] = `eq:${this.form.get('setor').value.id}`;
        }

        if (this.form.get('usuario').value) {
            andXFilter['usuario.id'] = `eq:${this.form.get('usuario').value.id}`;
        }

        if (this.form.get('modalidadeOrgaoCentral').value) {
            andXFilter['modalidadeOrgaoCentral.id'] = `eq:${this.form.get('modalidadeOrgaoCentral').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-vinculacao-repositorio-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
