import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {CdkTarefaFilterService} from './cdk-tarefa-filter.service';
import {of, Subject} from 'rxjs';
import {Pagination} from '../../../../models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
    selector: 'cdk-tarefa-filter',
    templateUrl: './cdk-tarefa-filter.component.html',
    styleUrls: ['./cdk-tarefa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTarefaFilterComponent implements AfterViewInit {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    unidadeResponsavelPagination: Pagination;

    @Input()
    unidadeOrigemPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    filterCriadoEm = [];
    filterAtualizadoEm = [];

    filterDataHoraLeitura = [];
    filterDataHoraDistribuicao = [];
    filterDataHoraInicioPrazo = [];
    filterDataHoraFinalPrazo = [];
    filterDataHoraConclusaoPrazo = [];

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        private _cdkTarefaFilterService: CdkTarefaFilterService
    ) {
        this.form = this._formBuilder.group({
            urgente: [null],
            observacao: [null],
            redistribuida: [null],
            processo: [null],
            especieTarefa: [null],
            usuarioResponsavel: [null],
            unidadeResponsavel: [null],
            interessado: [null],
            assunto: [null],
            unidadeOrigem: [null],
            setorOrigem: [null],
            setorResponsavel: [null],
            usuarioConclusaoPrazo: [null],
            distribuicaoAutomatica: [null],
            livreBalanceamento: [null],
            auditoriaDistribuicao: [null],
            tipoDistribuicao: [null],
            folder: [null],
            dataHoraLeitura: [null],
            dataHoraDistribuicao: [null],
            dataHoraInicioPrazo: [null],
            dataHoraFinalPrazo: [null],
            dataHoraConclusaoPrazo: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });

        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.filter = {parent: 'isNotNull'};
        this.unidadeOrigemPagination = new Pagination();
        this.unidadeOrigemPagination.filter = {parent: 'isNull'};
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.filter = {parent: 'isNotNull'};

        this.form.get('unidadeResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.setorResponsavelPagination.filter['unidade.id'] = `eq:${value.id}`;
                    } else {
                        delete this.setorResponsavelPagination.filter['unidade.id'];
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeOrigem').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.setorOrigemPagination.filter['unidade.id'] = `eq:${value.id}`;
                    } else {
                        delete this.setorOrigemPagination.filter['unidade.id'];
                    }
                    return of([]);
                }
            )
        ).subscribe();
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/sidebars/cdk-tarefa-filter';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        this._cdkTarefaFilterService.isValid = true;

        this._cdkTarefaFilterService.filters = [];

        this._cdkTarefaFilterService.emite.next();

        if (!this._cdkTarefaFilterService.isValid) {
            return;
        }

        const andXFilter = [];

        this._cdkTarefaFilterService.filters
            .forEach((andXFilterPlugin) => {
                andXFilter.push(andXFilterPlugin);
            });

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'observacao': `like:%${bit}%`});
            });
        }

        if (this.form.get('processo').value) {
            andXFilter.push({'processo.id': `eq:${this.form.get('processo').value.id}`});
        }

        if (this.form.get('especieTarefa').value) {
            andXFilter.push({'especieTarefa.id': `eq:${this.form.get('especieTarefa').value.id}`});
        }

        if (this.form.get('usuarioResponsavel').value) {
            andXFilter.push({'usuarioResponsavel.id': `eq:${this.form.get('usuarioResponsavel').value.id}`});
        }

        if (this.form.get('interessado').value) {
            andXFilter.push({'processo.interessados.pessoa.id': `eq:${this.form.get('interessado').value.id}`});
        }

        if (this.form.get('assunto').value) {
            andXFilter.push({'processo.assuntos.tarefa.id': `eq:${this.form.get('assunto').value.id}`});
        }

        if (this.form.get('unidadeOrigem').value) {
            andXFilter.push({'setorOrigem.unidade.id': `eq:${this.form.get('unidadeOrigem').value.id}`});
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter.push({'setorOrigem.id': `eq:${this.form.get('setorOrigem').value.id}`});
        }

        if (this.form.get('unidadeResponsavel').value) {
            andXFilter.push({'setorResponsavel.unidade.id': `eq:${this.form.get('unidadeResponsavel').value.id}`});
        }

        if (this.form.get('setorResponsavel').value) {
            andXFilter.push({'setorResponsavel.id': `eq:${this.form.get('setorResponsavel').value.id}`});
        }

        if (this.form.get('usuarioConclusaoPrazo').value) {
            andXFilter.push({'usuarioConclusaoPrazo.id': `eq:${this.form.get('usuarioConclusaoPrazo').value.id}`});
        }

        if (this.filterDataHoraLeitura?.length) {
            this.filterDataHoraLeitura.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraDistribuicao?.length) {
            this.filterDataHoraDistribuicao.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraInicioPrazo?.length) {
            this.filterDataHoraInicioPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraFinalPrazo?.length) {
            this.filterDataHoraFinalPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.filterDataHoraConclusaoPrazo?.length) {
            this.filterDataHoraConclusaoPrazo.forEach((filter) => {
                andXFilter.push(filter);
            });
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

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter').close();
    }

    filtraDataHoraLeitura(value: any): void {
        this.filterDataHoraLeitura = value;
    }

    filtraDataHoraDistribuicao(value: any): void {
        this.filterDataHoraDistribuicao = value;
    }

    filtraDataHoraInicioPrazo(value: any): void {
        this.filterDataHoraInicioPrazo = value;
    }

    filtraDataHoraFinalPrazo(value: any): void {
        this.filterDataHoraFinalPrazo = value;
    }

    filtraDataHoraConclusaoPrazo(value: any): void {
        this.filterDataHoraConclusaoPrazo = value;
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
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
        this._cdkTarefaFilterService.clear.next();
        this.emite();
    }
}
