import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-modelo-filter',
    templateUrl: './cdk-modelo-filter.component.html',
    styleUrls: ['./cdk-modelo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @Input()
    hasInatived = false;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            conteudo: [null],
            modalidadeModelo: [null],
            nome: [null],
            descricao: [null],
            tipoDocumento: [null],
            ativo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });
        this.form.controls.ativo.setValue("todos");
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('conteudo').value) {
            this.form.get('conteudo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'documento.componentesDigitais.conteudo': `like:%${bit}%`});
            });
        }

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('modalidadeModelo').value) {
            andXFilter.push({'modalidadeModelo.id': `eq:${this.form.get('modalidadeModelo').value.id}`});
        }

        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'documento.tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('ativo').value) {
            if(this.form.get('ativo').value !== 'todos') {
                andXFilter.push({'ativo': `eq:${this.form.get('ativo').value}`});
            }
            else {
                delete andXFilter['ativo'];
            }
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

        const contexto = this.hasInatived ?  {isAdmin: true} : {isAdmin: false};

        const request = {
            filters: {},
            contexto: contexto
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-modelo-filter').close();
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
        this.resetarFormulario();
        this.limparFormFiltroDatas$.next(true);
        this.emite();
    }

    resetarFormulario(): void {
        this.form.reset();
        this.form.controls.ativo.setValue("todos");
    }
}

