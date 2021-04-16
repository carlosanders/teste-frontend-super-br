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
import {Pagination} from '../../../../models';

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

    form: FormGroup;

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    assuntoAdministrativoPagination: Pagination;

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
            postIt: [null],
            processo: [null],
            especieTarefa: [null],
            usuarioResponsavel: [null],
            unidadeResponsavel: [null],
            interessado: [null],
            assunto: [null],
            setorOrigem: [null],
            setorResponsavel: [null],
            usuarioConclusaoPrazo: [null],
            distribuicaoAutomatica: [null],
            livreBalanceamento: [null],
            auditoriaDistribuicao: [null],
            tipoDistribuicao: [null],
            folder: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
        });

        this.assuntoAdministrativoPagination = new Pagination();
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/sidebars/cdk-tarefa-filter';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });
    }

    emite(): void {
        const andXFilter = {};

        if (this.form.get('postIt').value) {
            this.form.get('postIt').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['postIt'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('observacao').value) {
            this.form.get('observacao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andXFilter['observacao'] = `like:%${bit}%`;
            });
        }

        if (this.form.get('processo').value) {
            andXFilter['processo.id'] = `eq:${this.form.get('processo').value.id}`;
        }

        if (this.form.get('especieTarefa').value) {
            andXFilter['especieTarefa.id'] = `eq:${this.form.get('especieTarefa').value.id}`;
        }

        if (this.form.get('usuarioResponsavel').value) {
            andXFilter['usuarioResponsavel.id'] = `eq:${this.form.get('usuarioResponsavel').value.id}`;
        }

        if (this.form.get('interessado').value) {
            andXFilter['processo.interessados.pessoa.id'] = `eq:${this.form.get('interessado').value.id}`;
        }

        if (this.form.get('assunto').value) {
            andXFilter['processo.assuntos.assuntoAdministrativo.id'] = `eq:${this.form.get('assunto').value.id}`;
        }

        if (this.form.get('setorOrigem').value) {
            andXFilter['setorOrigem.id'] = `eq:${this.form.get('setorOrigem').value.id}`;
        }

        if (this.form.get('unidadeResponsavel').value) {
            andXFilter['unidadeResponsavel.id'] = `eq:${this.form.get('unidadeResponsavel').value.id}`;
        }

        if (this.form.get('setorResponsavel').value) {
            andXFilter['setorResponsavel.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
        }

        if (this.form.get('usuarioConclusaoPrazo').value) {
            andXFilter['usuarioConclusaoPrazo.id'] = `eq:${this.form.get('usuarioConclusaoPrazo').value.id}`;
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
