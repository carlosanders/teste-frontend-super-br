import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output, SimpleChange,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {CdkProcessoFilterService} from './cdk-processo-filter.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {LoginService} from '../../../../../app/main/auth/login/login.service';
import {Subject} from 'rxjs';
import {Etiqueta, Pagination} from '../../../../models';
import {Router} from '@angular/router';
import {CdkConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SearchBarEtiquetasFiltro} from "../../../search-bar-etiquetas/search-bar-etiquetas-filtro";

@Component({
    selector: 'cdk-processo-filter',
    templateUrl: './cdk-processo-filter.component.html',
    styleUrls: ['./cdk-processo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoFilterComponent implements OnInit, AfterViewInit {

    @Input()
    arrayFiltrosEtiquetas: SearchBarEtiquetasFiltro[] = [];

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    form: FormGroup;

    filterCriadoEm = [];
    filterAtualizadoEm = [];
    filterDataHoraAbertura = [];
    filterDataHoraProximaTransicao = [];

    etiquetas: Etiqueta[] = [];
    filtroEtiquetas: SearchBarEtiquetasFiltro;
    etiquetaFilter: any;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    unidadePagination: Pagination;

    setorPagination: Pagination;

    assuntoAdministrativoPagination: Pagination;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        private _cdkProcessoFilterService: CdkProcessoFilterService,
        public _loginService: LoginService,
        private _router: Router,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.form = this._formBuilder.group({
            processo: [null],
            assunto: [null],
            descricao: [null],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NUP: [null],
            especieProcesso: [null],
            titulo: [null],
            outroNumero: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            classificacao: [null],
            procedencia: [null],
            criadoPor: [null],
            atualizadoPor: [null],
            criadoEm: [null],
            atualizadoEm: [null],
            setorAtual: [null],
            unidade: [null],
            nome: [null],
            cpfCnpj: [null],
            lembreteArquivista: [null]
        });

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.filter = {parent: 'isNotNull'};
        this.setorPagination.populate = ['unidade'];

        this.assuntoAdministrativoPagination = new Pagination();
        this.assuntoAdministrativoPagination.populate = ['parent'];
    }

    ngOnInit(): void {
        this.form.get('unidade').valueChanges.subscribe((value) => {
            if (value && typeof value === 'object') {
                this.setorPagination.filter = {
                    ...this.setorPagination.filter,
                    ...{'unidade.id': `eq:${value.id}`}
                };
            }
        });
    }

    ngAfterViewInit(): void {
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            const path = '@cdk/components/processo/sidebars/cdk-processo-filter';
            modulesConfig.forEach((module) => {
                if (module.components.hasOwnProperty(path)) {
                    module.components[path].forEach(((c) => {
                        this._dynamicService.loadComponent(c)
                            .then((componentFactory) => {
                                this.container.createComponent(componentFactory);
                                this._changeDetectorRef.detectChanges();
                            });
                    }));
                }
            });
        }
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['arrayFiltrosEtiquetas']) {
            this.filtroEtiquetas = this.arrayFiltrosEtiquetas[0];
        }
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('cpfCnpj').value) {
            this.form.get('cpfCnpj').value.replace(/[^\d]+/g,'').split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'interessados.pessoa.numeroDocumentoPrincipal': `like:%${bit}%`});
            });
        }

        if (this.form.get('nome').value) {
            if(this.form.get('nome').value.includes('"', '\'')){
                andXFilter.push({'interessados.pessoa.nome': `like:%${this.form.get('nome').value}%`});
            } else{
                this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                    andXFilter.push({'interessados.pessoa.nome': `like:%${bit}%`});
                });
            }
        }

        if (this.form.get('NUP').value) {
            andXFilter.push({'id': `eq:${this.form.get('NUP').value.id}`});
        }

        if (this.form.get('titulo').value) {
            if(this.form.get('titulo').value.includes('"', '\'')){
                andXFilter.push({'titulo': `like:%${this.form.get('titulo').value}%`});
            } else{
                this.form.get('titulo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                    andXFilter.push({'titulo': `like:%${bit}%`});
                });
            }
        }

        if (this.form.get('descricao').value) {
            if(this.form.get('descricao').value.includes('"', '\'')){
                andXFilter.push({'descricao': `like:%${this.form.get('descricao').value}%`});
            } else{
                this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                    andXFilter.push({'descricao': `like:%${bit}%`});
                });
            }
        }

        if (this.form.get('outroNumero').value) {
            this.form.get('outroNumero').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'outroNumero': `like:%${bit}%`});
            });
        }

        if (this.form.get('assunto').value) {
            andXFilter.push({'assuntos.assuntoAdministrativo.id': `eq:${this.form.get('assunto').value.id}`});
        }

        if (this.form.get('classificacao').value) {
            andXFilter.push({'classificacao.id': `eq:${this.form.get('classificacao').value.id}`});
        }

        if (this.form.get('procedencia').value) {
            andXFilter.push({'procedencia.id': `eq:${this.form.get('procedencia').value.id}`});
        }

        if (this.form.get('setorAtual').value) {
            andXFilter.push({'setorAtual.id': `eq:${this.form.get('setorAtual').value.id}`});
        }

        if (this.form.get('unidade').value) {
            andXFilter.push({'setorAtual.unidade.id': `eq:${this.form.get('unidade').value.id}`});
        }

        if (this.form.get('modalidadeFase').value) {
            andXFilter.push({'modalidadeFase.id': `eq:${this.form.get('modalidadeFase').value.id}`});
        }

        if (this.form.get('modalidadeMeio').value) {
            andXFilter.push({'modalidadeMeio.id': `eq:${this.form.get('modalidadeMeio').value.id}`});
        }

        if (this.form.get('especieProcesso').value) {
            andXFilter.push({'especieProcesso.id': `eq:${this.form.get('especieProcesso').value.id}`});
        }

        if (this.form.get('lembreteArquivista').value) {
            if(this.form.get('lembreteArquivista').value.includes('"', '\'')){
                andXFilter.push({'lembreteArquivista': `like:%${this.form.get('lembreteArquivista').value}%`});
            } else {
                this.form.get('lembreteArquivista').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                    andXFilter.push({'lembreteArquivista': `like:%${bit}%`});
                });
            }
        }

        if (this.filterDataHoraAbertura?.length) {
            this.filterDataHoraAbertura.forEach((filter) => {
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

        if (this.filterDataHoraProximaTransicao?.length) {
            this.filterDataHoraProximaTransicao.forEach((filter) => {
                andXFilter.push(filter);
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('atualizadoPor').value) {
            andXFilter.push({'atualizadoPor.id': `eq:${this.form.get('atualizadoPor').value.id}`});
        }

        this.etiquetas.forEach((e) => {
            const objFiltro = {};
            objFiltro[this.filtroEtiquetas.queryFilter] = `eq:${e.id}`;
            andXFilter.push(objFiltro);
        });

        const request = {
            filters: {},
        };

        this._cdkProcessoFilterService.reset();
        this._cdkProcessoFilterService.collect.next(true);

        if (this._cdkProcessoFilterService.filters.length) {
            this._cdkProcessoFilterService.filters.forEach((f) => {
                andXFilter.push(f);
            });
        }

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
            this.selected.emit(request);
            if (this._router.url.indexOf('/apps/arquivista/') > -1) {
                this._cdkSidebarService?.getSidebar('cdk-processo-list-filter').close();
            }
        } else {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Erro!',
                    message: ' Ao menos um campo deve ser preenchido!',
                    confirmLabel: 'Fechar',
                    hideCancel: true,
                },
                disableClose: false,
            });
        }
    }

    filtraCriadoEm(value: any): void {
        this.filterCriadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraAtualizadoEm(value: any): void {
        this.filterAtualizadoEm = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraAbertura(value: any): void {
        this.filterDataHoraAbertura = value;
        this.limparFormFiltroDatas$.next(false);
    }

    filtraDataHoraProximaTransicao(value: any): void {
        this.filterDataHoraProximaTransicao = value;
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
        this._cdkProcessoFilterService.clear.next(true);
        const request = {
            filters: {},
        };
        this.etiquetas = [];
        this.selected.emit(request);
        if (this._router.url.indexOf('/apps/arquivista/') > -1) {
            this._cdkSidebarService?.getSidebar('cdk-processo-list-filter').close();
        }
    }

    showClassificacao(): boolean {
        if (!this._loginService.isGranted('ROLE_COLABORADOR')) {
            return false;
        }
        return !(this._router.url.indexOf('pronto-eliminacao') > -1 || this._router.url.indexOf('pronto-recolhimento') > -1);
    }

    showDataTransicao(): boolean {
        if (!this._loginService.isGranted('ROLE_ARQUIVISTA')) {
            return false;
        }
        return (this._router.url.indexOf('/apps/arquivista/') > -1);
    }

    showModalidadeFase(): boolean {
        if (!this._loginService.isGranted('ROLE_COLABORADOR')) {
            return false;
        }
        return !(this._router.url.indexOf('/apps/arquivista/') > -1 && this._router.url.indexOf('pronto-') > -1);
    }

    showUnidade(): boolean {
        if (!this._loginService.isGranted('ROLE_COLABORADOR')) {
            return false;
        }
        return !(this._router.url.indexOf('/apps/arquivista/') > -1);
    }

    showLembrete(): boolean {
        if (!this._loginService.isGranted('ROLE_ARQUIVISTA')) {
            return false;
        }
        return (this._router.url.indexOf('/apps/arquivista/') > -1);
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
}
