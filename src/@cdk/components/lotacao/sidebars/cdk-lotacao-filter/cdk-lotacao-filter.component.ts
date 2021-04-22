import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '../../../../models';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-lotacao-filter',
    templateUrl: './cdk-lotacao-filter.component.html',
    styleUrls: ['./cdk-lotacao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLotacaoFilterComponent {

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
            colaborador: [null],
            setor: [null],
            peso: [null],
            digitosDistribuicao: [null],
            centenasDistribuicao: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });

        this.pagination = new Pagination();
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('peso').value) {
            this.form.get('peso').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['peso'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('digitosDistribuicao').value) {
            this.form.get('digitosDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['digitosDistribuicao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('centenasDistribuicao').value) {
            this.form.get('centenasDistribuicao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['centenasDistribuicao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('colaborador').value) {
            andXFilter['colaborador.id'] = `eq:${this.form.get('colaborador').value.id}`;
        }

        if (this.form.get('setor').value) {
            andXFilter['setor.id'] = `eq:${this.form.get('setor').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-lotacao-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
