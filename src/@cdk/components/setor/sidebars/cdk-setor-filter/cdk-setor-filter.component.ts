import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-setor-filter',
    templateUrl: './cdk-setor-filter.component.html',
    styleUrls: ['./cdk-setor-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSetorFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            especieSetor: [null],
            generoSetor: [null],
            ativo: [null],
            modalidadeOrgaoCentral: [null],
            endereco: [null],
            email: [null],
            sigla: [null],
            unidade: [null],
            parent: [null],
            unidadePai: [null],
            municipio: [null],
            prefixoNUP: [null],
            sequenciaInicialNUP: [null],
            gerenciamento: [null],
            apenasProtocolo: [null],
            numeracaoDocumentoUnidade: [null],
            apenasDistribuidor: [null],
            distribuicaoCentena: [null],
            prazoEqualizacao: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('nome').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    nome: `like:${value}%`
                };
            }
        });

        this.form.get('endereco').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    endereco: `like:${value}%`
                };
            }
        });

        this.form.get('email').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    email: `like:${value}%`
                };
            }
        });

        this.form.get('sigla').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    sigla: `like:${value}%`
                };
            }
        });

        this.form.get('prefixoNUP').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prefixoNUP: `like:${value}%`
                };
            }
        });

        this.form.get('prazoEqualizacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoEqualizacao: `like:${value}%`
                };
            }
        });

        this.form.get('sequenciaInicialNUP').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    sequenciaInicialNUP: `like:${value}%`
                };
            }
        });

        this.form.get('apenasProtocolo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    apenasProtocolo: `eq:${value}`
                };
            }
        });

        this.form.get('apenasDistribuidor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    apenasDistribuidor: `eq:${value}`
                };
            }
        });

        this.form.get('ativo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    ativo: `eq:${value}`
                };
            }
        });

        this.form.get('gerenciamento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    gerenciamento: `eq:${value}`
                };
            }
        });

        this.form.get('numeracaoDocumentoUnidade').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    numeracaoDocumentoUnidade: `eq:${value}`
                };
            }
        });

        this.form.get('distribuicaoCentena').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    distribuicaoCentena: `eq:${value}`
                };
            }
        });

        this.form.get('unidade').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'unidade.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('unidade.id')) {
                        delete this.filters['unidade.id'];
                    }
                }
            }
        });

        this.form.get('parent').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'parent.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('parent.id')) {
                        delete this.filters['parent.id'];
                    }
                }
            }
        });

        this.form.get('unidadePai').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'unidadePai.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('unidadePai.id')) {
                        delete this.filters['unidadePai.id'];
                    }
                }
            }
        });

        this.form.get('municipio').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'municipio.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('municipio.id')) {
                        delete this.filters['municipio.id'];
                    }
                }
            }
        });

        this.form.get('generoSetor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'generoSetor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('generoSetor.id')) {
                        delete this.filters['generoSetor.id'];
                    }
                }
            }
        });

        this.form.get('especieSetor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'especieSetor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('especieSetor.id')) {
                        delete this.filters['especieSetor.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeOrgaoCentral').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeOrgaoCentral.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeOrgaoCentral.id')) {
                        delete this.filters['modalidadeOrgaoCentral.id'];
                    }
                }
            }
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    criadoEm: `eq:${value}`
                };
            }
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    atualizadoEm: `eq:${value}`
                };
            }
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    apagadoEm: `eq:${value}`
                };
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'criadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('criadoPor.id')) {
                        delete this.filters['criadoPor.id'];
                    }
                }
            }
        });

        this.form.get('atualizadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'atualizadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('atualizadoPor.id')) {
                        delete this.filters['atualizadoPor.id'];
                    }
                }
            }
        });

        this.form.get('apagadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'apagadoPor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('apagadoPor.id')) {
                        delete this.filters['apagadoPor.id'];
                    }
                }
            }
        });
    }

    emite(): void {
        const request = {
            filters: this.filters
        };
        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-setor-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
    }
}
