import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-cargo-filter',
    templateUrl: './cdk-cargo-filter.component.html',
    styleUrls: ['./cdk-cargo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCargoFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();
    @Input()
    hasInatived = false;

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
        });
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

        if (this.form.get('ativo').value) {
            if(this.form.get('ativo').value !== 'todos') {
                andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
            }
            else {
                delete andXFilter['ativo'];
            }
        }

        if (this.filterCriadoEm.length > 0) {
            this.filterCriadoEm.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.filterAtualizadoEm.length > 0) {
            this.filterAtualizadoEm.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        this.form.controls.ativo.setValue("todos");


        const contexto = this.hasInatived ?  {isAdmin: true} : {isAdmin: false};

        const request = {
            filters: {},
            contexto: contexto
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-cargo-filter').close();
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
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
        this.limparFormFiltroDatas$.next(true);
        this.resetarFormulario();
        this.emite();
    }

    resetarFormulario(): void {
        this.form.reset();
        this.form.controls.ativo.setValue("todos");
    }
}
