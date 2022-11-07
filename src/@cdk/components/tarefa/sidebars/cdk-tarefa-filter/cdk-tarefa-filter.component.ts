import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input, OnChanges,
    Output, SimpleChange,
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
import {EspecieTarefa, Etiqueta, Pagination} from '../../../../models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SearchBarEtiquetasFiltro} from '../../../search-bar-etiquetas/search-bar-etiquetas-filtro';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'cdk-tarefa-filter',
    templateUrl: './cdk-tarefa-filter.component.html',
    styleUrls: ['./cdk-tarefa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTarefaFilterComponent implements AfterViewInit, OnChanges {

    @Input()
    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];

    @Output()
    selected = new EventEmitter<any>();

    @Output()
    limpaFiltros = new EventEmitter<any>();

    @Input()
    doLimparFiltro: Subject<boolean> = new Subject<boolean>();

    @Input()
    mode = 'list';

    @Input()
    typeHandle: any;

    @Input()
    targetHandle: any;

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

    @Input()
    filterProcesso = null;

    @Input()
    filterEtiquetas: any = [];

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterApagadoEm = [];

    filterDataHoraLeitura = [];
    filterDataHoraDistribuicao = [];
    filterDataHoraInicioPrazo = [];
    filterDataHoraFinalPrazo = [];
    filterDataHoraConclusaoPrazo = [];

    @Input()
    etiquetas: Etiqueta[] = [];

    filtroEtiquetas: SearchBarEtiquetasFiltro;
    etiquetaFilter: any;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    especieTarefaPagination = new Pagination();
    selectedEspecieTarefaList: EspecieTarefa[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('especieTarefa', {static: true}) especieTarefaRef: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        private _cdkTarefaFilterService: CdkTarefaFilterService,
        private _changeDetectorRef: ChangeDetectorRef
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
            especieRelevancia: [null],
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
            apagadoPor: [null],
            apagadoEm: [null],
            tipoBusca: [null],
        });
        this.form.get('setorResponsavel').disable();
        this.form.get('setorOrigem').disable();
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
                        this.form.get('setorResponsavel').enable();
                        this.form.get('setorResponsavel').reset();
                    } else {
                        delete this.setorResponsavelPagination.filter['unidade.id'];
                        this.form.get('setorResponsavel').reset();
                        this.form.get('setorResponsavel').disable();
                    }
                    this._changeDetectorRef.markForCheck();
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
                        this.form.get('setorOrigem').reset();
                        this.form.get('setorOrigem').enable();
                    } else {
                        delete this.setorOrigemPagination.filter['unidade.id'];
                        this.form.get('setorOrigem').reset();
                        this.form.get('setorOrigem').disable();
                    }
                    this._changeDetectorRef.markForCheck();
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
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
        this.doLimparFiltro.subscribe((value) => {
            if (value) {
                this.removeFiltros();
                this.doLimparFiltro.next(false);
            }
        })
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['arrayFiltrosEtiquetas']) {
            this.filtroEtiquetas = this.arrayFiltrosEtiquetas[0];
        }

        if (changes['targetHandle'] && !changes['targetHandle'].firstChange && changes['targetHandle'].currentValue !== undefined && this.typeHandle === 'minhas-tarefas' && changes['targetHandle'].previousValue !== this.targetHandle) {
            this.removeFiltros();
        }

        if (changes['typeHandle'] && !changes['typeHandle'].firstChange && this.typeHandle !== changes['typeHandle']?.previousValue) {
            this.removeFiltros();
        }

        if (this.filterProcesso) {
            this.form.get('processo').setValue(this.filterProcesso);
        }
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        this._cdkTarefaFilterService.isValid = true;

        this._cdkTarefaFilterService.filters = [];

        this._cdkTarefaFilterService.emite.next(true);

        if (!this._cdkTarefaFilterService.isValid) {
            return;
        }


        const request = {
            filters: {},
            tipoBusca: null
        };

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

        if (this.selectedEspecieTarefaList.length > 0) {
            andXFilter.push({'especieTarefa.id': `in:${this.selectedEspecieTarefaList.map(especieTarefa => especieTarefa.id).join(',')}`});
        }

        if (this.form.get('especieRelevancia').value) {
            andXFilter.push({'processo.relevancias.especieRelevancia.id': `eq:${this.form.get('especieRelevancia').value.id}`});
        }

        if (this.form.get('usuarioResponsavel').value) {
            andXFilter.push({'usuarioResponsavel.id': `eq:${this.form.get('usuarioResponsavel').value.id}`});
        }

        if (this.form.get('interessado').value) {
            this.form.get('interessado').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'processo.interessados.pessoa.nome': `like:%${bit}%`});
            });
        }

        if (this.form.get('assunto').value) {
            andXFilter.push({'processo.assuntos.assuntoAdministrativo.id': `eq:${this.form.get('assunto').value.id}`});
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

        if (this.form.get('urgente').value) {
            if (this.form.get('urgente').value !== 'todos') {
                andXFilter.push({'urgente': `eq:${this.form.get('urgente').value}`});
            } else {
                delete andXFilter['urgente'];
            }
        }

        if (this.form.get('redistribuida').value) {
            if (this.form.get('redistribuida').value !== 'todos') {
                andXFilter.push({'redistribuida': `eq:${this.form.get('redistribuida').value}`});
            } else {
                delete andXFilter['redistribuida'];
            }
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

        if (this.filterApagadoEm?.length) {
            this.filterApagadoEm.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        if (this.form.get('apagadoPor').value) {
            andXFilter.push({'apagadoPor.id': `eq:${this.form.get('apagadoPor').value.id}`});
        }

        if (this.typeHandle === 'minhas-tarefas' && this.form.get('tipoBusca').value !== 'pastaAtual') {
            request.tipoBusca = this.form.get('tipoBusca').value;
        } else {
            request.tipoBusca = null;
        }

        this.etiquetas.forEach((e) => {
            const objFiltro = {};
            objFiltro[this.filtroEtiquetas.queryFilter] = `eq:${e.id}`;
            andXFilter.push(objFiltro);
        });

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter')?.close();
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter-grid')?.close();
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

    removeFiltros(): void {
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this._cdkTarefaFilterService.clear.next(true);
        this.etiquetas = [];
        this.selectedEspecieTarefaList = [];

        if (this.form.get('tipoBusca')) {
            this.form.get('tipoBusca').setValue('pastaAtual');
        }
        this.form.get('redistribuida').setValue('todos');
        this.form.get('urgente').setValue('todos');
        const request = {
            filters: {},
            tipoBusca: null
        };
        this.limpaFiltros.emit(request);
    }

    limpar(): void {
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
        this._cdkTarefaFilterService.clear.next(true);
        this.etiquetas = [];
        this.selectedEspecieTarefaList = [];

        if (this.form.get('tipoBusca')) {
            this.form.get('tipoBusca').setValue('pastaAtual');
        }
        this.form.get('redistribuida').setValue('todos');
        this.form.get('urgente').setValue('todos');

        this.emite();
    }

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
    }

    changeEtiquetaFilter(filtro: SearchBarEtiquetasFiltro): void {
        this.etiquetas = [];
        this.filtroEtiquetas = filtro;
    }

    especieTarefaDisabledFn(especieTarefa: EspecieTarefa, pagination: Pagination): boolean {
        return false;
    }

    especieTarefaDisplayItemFn(especieTarefa: EspecieTarefa): string {
        let displayed = especieTarefa ? especieTarefa.nome : '';
        displayed += (especieTarefa && especieTarefa.generoTarefa) ? (' (' + especieTarefa.generoTarefa.nome + ')') : '';
        return displayed;
    }

    updateSelectedEspecieTarefaList(selectedList: EspecieTarefa[]): void {
        this.selectedEspecieTarefaList = selectedList;
        if (this.form.get('especieTarefa')) {
            this.especieTarefaRef.nativeElement.focus();
            this._changeDetectorRef.markForCheck();
            this.form.patchValue({especieTarefa: ''});
        }
    }
}
