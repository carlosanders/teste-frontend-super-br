import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, EventEmitter, Input,
    OnInit, Output, ViewChild, ViewContainerRef,
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

@Component({
    selector: 'cdk-processo-filter',
    templateUrl: './cdk-processo-filter.component.html',
    styleUrls: ['./cdk-processo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoFilterComponent implements OnInit, AfterViewInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    limparFormFiltroDatas$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
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
            valorEconomico: [null],
            semValorEconomico: [null],
            NUP: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            acessoNegado: [null],
            dataHoraProximaTransicao: [null],
            titulo: [null],
            outroNumero: [null],
            chaveAcesso: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            documentoAvulsoOrigem: [null],
            classificacao: [null],
            procedencia: [null],
            localizador: [null],
            setorAtual: [null],
            setorInicial: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            nome: [null],
            cpfCnpj: [null]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('NUP').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').map(bit => bit.replace(/[^\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({NUP: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('NUP')) {
                        delete this._cdkProcessoFilterService.filters['NUP'];
                    }
                }
            }
        });

        this.form.get('nome').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({'interessados.pessoa.nome': `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('interessados.pessoa.nome')) {
                        delete this._cdkProcessoFilterService.filters['interessados.pessoa.nome'];
                    }
                }
            }
        });

        this.form.get('cpfCnpj').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({'interessados.pessoa.numeroDocumentoPrincipal': `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('interessados.pessoa.numeroDocumentoPrincipal')) {
                        delete this._cdkProcessoFilterService.filters['interessados.pessoa.numeroDocumentoPrincipal'];
                    }
                }
            }
        });

        this.form.get('titulo').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({titulo: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('titulo')) {
                        delete this._cdkProcessoFilterService.filters['titulo'];
                    }
                }
            }
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({descricao: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('descricao')) {
                        delete this._cdkProcessoFilterService.filters['descricao'];
                    }
                }
            }
        });

        this.form.get('outroNumero').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({outroNumero: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('outroNumero')) {
                        delete this._cdkProcessoFilterService.filters['outroNumero'];
                    }
                }
            }
        });

        this.form.get('valorEconomico').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    valorEconomico: `like:${value}%`
                };
            }
        });

        this.form.get('dataHoraProximaTransicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    dataHoraProximaTransicao: `eq:${value}`
                };
            }
        });

        this.form.get('semValorEconomico').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    semValorEconomico: `eq:${value}`
                };
            }
        });

        this.form.get('visibilidadeExterna').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    visibilidadeExterna: `eq:${value}`
                };
            }
        });

        this.form.get('acessoNegado').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    acessoNegado: `eq:${value}`
                };
            }
        });

        this.form.get('classificacao').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'classificacao.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('classificacao.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['classificacao.id'];
                    }
                }
            }
        });

        this.form.get('documentoAvulsoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'documentoAvulsoOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('documentoAvulsoOrigem.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['documentoAvulsoOrigem.id'];
                    }
                }
            }
        });

        this.form.get('procedencia').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'procedencia.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('procedencia.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['procedencia.id'];
                    }
                }
            }
        });

        this.form.get('localizador').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'localizador.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('localizador.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['localizador.id'];
                    }
                }
            }
        });

        this.form.get('setorAtual').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'setorAtual.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('setorAtual.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['setorAtual.id'];
                    }
                }
            }
        });

        this.form.get('setorInicial').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'setorInicial.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('setorInicial.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['setorInicial.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeFase').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'modalidadeFase.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('modalidadeFase.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['modalidadeFase.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeMeio').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'modalidadeMeio.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('modalidadeMeio.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['modalidadeMeio.id'];
                    }
                }
            }
        });

        this.form.get('especieProcesso').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'especieProcesso.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('especieProcesso.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['especieProcesso.id'];
                    }
                }
            }
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    criadoEm: `eq:${value}`
                };
            }
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this._cdkProcessoFilterService.filters = {
                    ...this._cdkProcessoFilterService.filters,
                    atualizadoEm: `eq:${value}`
                };
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'criadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('criadoPor.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['criadoPor.id'];
                    }
                }
            }
        });

        this.form.get('atualizadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this._cdkProcessoFilterService.filters = {
                        ...this._cdkProcessoFilterService.filters,
                        'atualizadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this._cdkProcessoFilterService.filters.hasOwnProperty('atualizadoPor.id')) {
                        this._cdkProcessoFilterService.filters = {...this._cdkProcessoFilterService.filters};
                        delete this._cdkProcessoFilterService.filters['atualizadoPor.id'];
                    }
                }
            }
        });
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

    filtraData(value: any, campo: string): void {
        if (this._cdkProcessoFilterService.filters.hasOwnProperty('andX')) {
            let andX = this._cdkProcessoFilterService.filters['andX'];
            andX = andX.filter((filtro) => {
                return !filtro.hasOwnProperty(campo);
            });
            this._cdkProcessoFilterService.filters = {
                ...this._cdkProcessoFilterService.filters,
                andX: andX
            };
        }

        let andX = this._cdkProcessoFilterService.filters['andX'];
        if (andX) {
            value.forEach((filtro) => andX.push(filtro));
            this._cdkProcessoFilterService.filters = {
                ...this._cdkProcessoFilterService.filters,
                andX: andX
            };
        } else {
            this._cdkProcessoFilterService.filters = {
                ...this._cdkProcessoFilterService.filters,
                andX: value
            };
        }
    }

    hasDateFilter(campo: string): boolean {
        return this._cdkProcessoFilterService.filters.andX?.filter((filtro) => filtro.hasOwnProperty(campo)).length > 0;
    }

    emite(): void {
        const request = {
            filters: this._cdkProcessoFilterService.filters,
        };
        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-processo-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this._cdkProcessoFilterService.filters = {};
        this._cdkProcessoFilterService.clear.next();
        this.emite();
        this.form.reset();
        this.limparFormFiltroDatas$.next(true);
    }
}
