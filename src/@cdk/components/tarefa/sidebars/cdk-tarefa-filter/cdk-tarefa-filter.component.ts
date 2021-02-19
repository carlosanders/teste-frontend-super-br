import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
    Input,
    ViewEncapsulation,
    ViewChild, ViewContainerRef, AfterViewInit
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {CdkTarefaFilterService} from './cdk-tarefa-filter.service';
import {Pagination} from '../../../../models';
import {Subject} from 'rxjs';

@Component({
    selector: 'cdk-tarefa-filter',
    templateUrl: './cdk-tarefa-filter.component.html',
    styleUrls: ['./cdk-tarefa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTarefaFilterComponent implements OnInit, AfterViewInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    filters: any = {};

    assuntoAdministrativoPagination: Pagination;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
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
            atualizadoPor: [null],
            apagadoPor: [null],
        });

        this.assuntoAdministrativoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.assuntoAdministrativoPagination.populate = ['parent'];

        this.form.get('postIt').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({postIt: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('postIt')) {
                        delete this.filters['postIt'];
                    }
                }
            }
        });

        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({observacao: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('observacao')) {
                        delete this.filters['observacao'];
                    }
                }
            }
        });

        this.form.get('urgente').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkTarefaFilterService.filters = {
                    ...this._cdkTarefaFilterService.filters,
                    urgente: `eq:${value}`
                };
            }
        });

        this.form.get('redistribuida').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkTarefaFilterService.filters = {
                    ...this._cdkTarefaFilterService.filters,
                    redistribuida: `eq:${value}`
                };
            }
        });

        this.form.get('processo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'processo.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('processo.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['processo.id'];
                    }
                }
            }
        });

        this.form.get('especieTarefa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'especieTarefa.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('especieTarefa.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['especieTarefa.id'];
                    }
                }
            }
        });

        this.form.get('usuarioResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'usuarioResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('usuarioResponsavel.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['usuarioResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('interessado').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'processo.interessados.pessoa.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('processo.interessados.pessoa.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['processo.interessados.pessoa.id'];
                    }
                }
            }
        });

        this.form.get('assunto').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'processo.assuntos.assuntoAdministrativo.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('processo.assuntos.assuntoAdministrativo.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['processo.assuntos.assuntoAdministrativo.id'];
                    }
                }
            }
        });

        this.form.get('setorOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'setorOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('setorOrigem.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['setorOrigem.id'];
                    }
                }
            }
        });

        this.form.get('unidadeResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'unidadeResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('unidadeResponsavel.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['unidadeResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('setorResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'setorResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('setorResponsavel.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['setorResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('usuarioConclusaoPrazo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'usuarioConclusaoPrazo.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('usuarioConclusaoPrazo.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['usuarioConclusaoPrazo.id'];
                    }
                }
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'criadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('criadoPor.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['criadoPor.id'];
                    }
                }
            }
        });

        this.form.get('atualizadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'atualizadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('atualizadoPor.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['atualizadoPor.id'];
                    }
                }
            }
        });

        this.form.get('apagadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkTarefaFilterService.filters = {
                        ...this._cdkTarefaFilterService.filters,
                        'apagadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkTarefaFilterService.filters.hasOwnProperty('apagadoPor.id')) {
                        this._cdkTarefaFilterService.filters = {...this._cdkTarefaFilterService.filters};
                        delete this._cdkTarefaFilterService.filters['apagadoPor.id'];
                    }
                }
            }
        });
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

    filtraData(value: any, campo: string): void {
        if (this._cdkTarefaFilterService.filters.hasOwnProperty('andX')) {
            let andX = this._cdkTarefaFilterService.filters['andX'];
            andX = andX.filter((filtro) => {
                return !filtro.hasOwnProperty(campo);
            });
            this._cdkTarefaFilterService.filters = {
                ...this._cdkTarefaFilterService.filters,
                andX: andX
            };
        }

        let andX = this._cdkTarefaFilterService.filters['andX'];
        if (andX) {
            value.forEach((filtro) => andX.push(filtro));
            this._cdkTarefaFilterService.filters = {
                ...this._cdkTarefaFilterService.filters,
                andX: andX
            };
        } else {
            this._cdkTarefaFilterService.filters = {
                ...this._cdkTarefaFilterService.filters,
                andX: value
            };
        }
    }

    hasDateFilter(campo: string): boolean {
        return this._cdkTarefaFilterService.filters.andX?.filter((filtro) => filtro.hasOwnProperty(campo)).length > 0;
    }

    emite(): void {
        const request = {
            ...this._cdkTarefaFilterService.filters,
            filters: this._cdkTarefaFilterService.filters
        };
        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-tarefa-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this._cdkTarefaFilterService.filters = {};
        this._cdkTarefaFilterService.clear.next();
        this.emite();
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
    }
}
