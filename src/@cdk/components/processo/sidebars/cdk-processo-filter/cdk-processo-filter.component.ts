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
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {CdkProcessoFilterService} from './cdk-processo-filter.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {LoginService} from '../../../../../app/main/auth/login/login.service';
import {Subject} from 'rxjs';
import {Pagination} from "../../../../models";

@Component({
    selector: 'cdk-processo-filter',
    templateUrl: './cdk-processo-filter.component.html',
    styleUrls: ['./cdk-processo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoFilterComponent implements AfterViewInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    unidadePagination: Pagination;

    setorPagination: Pagination;

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
        private _dynamicService: DynamicService,
        private _cdkProcessoFilterService: CdkProcessoFilterService,
        public _loginService: LoginService,
    ) {
        this.form = this._formBuilder.group({
            processo: [null],
            descricao: [null],
            NUP: [null],
            especieProcesso: [null],
            titulo: [null],
            outroNumero: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            classificacao: [null],
            procedencia: [null],
            setorAtual: [null],
            unidade: [null],
            nome: [null],
            cpfCnpj: [null]
        });

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.filter = {parent: 'isNotNull'};
        this.setorPagination.populate = ['unidade'];
    }

    ngAfterViewInit(): void {
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            const path = '@cdk/components/processo/sidebars/cdk-processo-filter';
            modulesConfig.forEach((module) => {
                if (module.components.hasOwnProperty(path)) {
                    module.components[path].forEach((c => {
                        this._dynamicService.loadComponent(c)
                            .then(componentFactory => this.container.createComponent(componentFactory));
                    }));
                }
            });
        }
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('cpfCnpj').value) {
            this.form.get('cpfCnpj').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['interessados.pessoa.numeroDocumentoPrincipal'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('nome').value) {
            this.form.get('nome').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['interessados.pessoa.nome'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('NUP').value) {
            this.form.get('NUP').value.split(' ').map(bit => bit.replace(/[^\\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['NUP'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('titulo').value) {
            this.form.get('titulo').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['titulo'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('descricao').value) {
            this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['descricao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('outroNumero').value) {
            this.form.get('outroNumero').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['outroNumero'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('classificacao').value) {
            andXFilter['classificacao.id'] = `eq:${this.form.get('classificacao').value.id}`;
        }

        if (this.form.get('procedencia').value) {
            andXFilter['procedencia.id'] = `eq:${this.form.get('procedencia').value.id}`;
        }

        if (this.form.get('setorAtual').value) {
            andXFilter['setorAtual.id'] = `eq:${this.form.get('setorAtual').value.id}`;
        }

        if (this.form.get('unidade').value) {
            andXFilter['setorAtual.unidade.id'] = `eq:${this.form.get('unidade').value.id}`;
        }

        if (this.form.get('modalidadeFase').value) {
            andXFilter['modalidadeFase.id'] = `eq:${this.form.get('modalidadeFase').value.id}`;
        }

        if (this.form.get('modalidadeMeio').value) {
            andXFilter['modalidadeMeio.id'] = `eq:${this.form.get('modalidadeMeio').value.id}`;
        }

        if (this.form.get('especieProcesso').value) {
            andXFilter['especieProcesso.id'] = `eq:${this.form.get('especieProcesso').value.id}`;
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
        this._cdkSidebarService.getSidebar('cdk-especie-tarefa-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
