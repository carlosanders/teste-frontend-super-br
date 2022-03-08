import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {Subject} from 'rxjs';
import {EspecieTarefa, Pagination} from "../../../../models";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'cdk-workflow-filter',
    templateUrl: './cdk-workflow-filter.component.html',
    styleUrls: ['./cdk-workflow-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkWorkflowFilterComponent {

    @Input() mode = 'list';
    @Output() selected = new EventEmitter<any>();
    @ViewChild('especieTarefaInicial', {static: true}) especieTarefaInicialRef: ElementRef<HTMLInputElement>;
    form: FormGroup;
    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterApagadoEm = [];
    especieTarefaInicialPaination = new Pagination();
    selectedEspecieTarefaList: EspecieTarefa[] = [];
    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        this.especieTarefaInicialPaination = new Pagination();
        this.form = this._formBuilder.group({
            especieTarefaInicial: [null],
            especieProcesso: [null],
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

        if (this.selectedEspecieTarefaList.length) {
            andXFilter.push({'especieTarefaInicial.id': `in:${this.selectedEspecieTarefaList.map((especieTarefa) => especieTarefa.id).join(',')}`});
        }

        if (this.form.get('especieProcesso').value) {
            andXFilter.push({'especieProcesso.id': `eq:${this.form.get('especieProcesso').value.id}`});
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
        this._cdkSidebarService.getSidebar('cdk-workflow-filter').close();
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
        this.selectedEspecieTarefaList = [];
        this.emite();
    }

    especieTarefaDisabledFn(especieTarefa: EspecieTarefa, pagination: Pagination): boolean {
        return false;
    }

    especieTarefaDisplayItemFn(especieTarefa: EspecieTarefa): string {
        let displayed = especieTarefa ? especieTarefa.nome : '';
        displayed += (especieTarefa && especieTarefa.generoTarefa) ? (' (' + especieTarefa.generoTarefa.nome + ')') : '';
        return displayed;
    }

    updateSelectedEspecieTarefaInicialList(selectedList: EspecieTarefa[]): void {
        this.selectedEspecieTarefaList = selectedList;
        if (this.form.get('especieTarefaInicial')) {
            this.especieTarefaInicialRef.nativeElement.focus();
            this._changeDetectionRef.markForCheck();
        }
    }
}
