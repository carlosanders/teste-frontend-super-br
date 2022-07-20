import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-cronjob-filter',
    templateUrl: './cdk-cronjob-filter.component.html',
    styleUrls: ['./cdk-cronjob-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCronjobFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';


    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterApagadoEm = [];
    filterDataHoraUltimaExecucao = [];


    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();


    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            dataHoraUltimaExecucao: [null],
            statusUltimaExecucao: [null],
            usuarioUltimaExecucao: [null],
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

        if (this.filterDataHoraUltimaExecucao.length > 0) {
            this.filterDataHoraUltimaExecucao.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.filterCriadoEm.length > 0) {
            this.filterCriadoEm.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.filterAtualizadoEm.length > 0) {
            this.filterAtualizadoEm.forEach((bit) => {andXFilter.push(bit)});
        }
        if (this.filterApagadoEm.length > 0) {
            this.filterApagadoEm.forEach((bit) => {andXFilter.push(bit)});
        }

        if (this.form.get('statusUltimaExecucao').value) {
            andXFilter.push({'statusUltimaExecucao': `eq:${this.form.get('statusUltimaExecucao').value}`});
        }

        if (this.form.get('usuarioUltimaExecucao').value) {
            andXFilter.push({'usuarioUltimaExecucao.id': `eq:${this.form.get('usuarioUltimaExecucao').value.id}`});
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
        this._cdkSidebarService.getSidebar('cdk-cronjob-filter').close();
    }

    filtraDataHoraUltimaExecucao(value: any): void {
        this.filterDataHoraUltimaExecucao = value;
        this.limparFormFiltroDatas$.next(false);
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
