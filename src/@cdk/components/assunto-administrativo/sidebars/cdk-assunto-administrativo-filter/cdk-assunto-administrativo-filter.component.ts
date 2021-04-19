import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-assunto-administrativo-filter',
    templateUrl: './cdk-assunto-administrativo-filter.component.html',
    styleUrls: ['./cdk-assunto-administrativo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoAdministrativoFilterComponent {

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
            nome: [null],
            glossario: [null],
            dispositivoLegal: [null],
            codigoCNJ: [null],
            parent: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['nome'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('glossario').value) {
            this.form.get('glossario').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['glossario'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('dispositivoLegal').value) {
            this.form.get('dispositivoLegal').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['dispositivoLegal'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('codigoCNJ').value) {
            this.form.get('codigoCNJ').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['codigoCNJ'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('parent').value) {
            andXFilter['parent.id'] = `eq:${this.form.get('parent').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-assunto-administrativo-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
