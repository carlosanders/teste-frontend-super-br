import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '@cdk/models';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-numero-unico-documento-filter',
    templateUrl: './cdk-numero-unico-documento-filter.component.html',
    styleUrls: ['./cdk-numero-unico-documento-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkNumeroUnicoDocumentoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    pagination: Pagination;

    @Input()
    mode = 'list';

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            tipoDocumento: [null],
            setor: [null],
            sequencia: [null],
            ano: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });

        this.pagination = new Pagination();
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('sequencia').value) {
            this.form.get('sequencia').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['sequencia'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter['tipoDocumento.id'] = `eq:${this.form.get('tipoDocumento').value.id}`;
        }

        if (this.form.get('setor').value) {
            andXFilter['setor.id'] = `eq:${this.form.get('setor').value.id}`;
        }

        if (this.form.get('ano').value) {
            andXFilter['ano'] = `eq:${this.form.get('ano').value}`;
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
        this._cdkSidebarService.getSidebar('cdk-numero-unico-documento-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
