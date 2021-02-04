import {
    ChangeDetectionStrategy,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    Component,
    Output,
    Input
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-pessoa-filter',
    templateUrl: './cdk-pessoa-filter.component.html',
    styleUrls: ['./cdk-pessoa-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkPessoaFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    form: FormGroup;

    filters: any = {};

    /**
     * @param _formBuilder
     * @param _cdkSidebarService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            numeroDocumentoPrincipal: [null],
            contato: [null],
            pessoaValidada: [null],
            pessoaRepresentada: [null],
            dataNascimento: [null],
            dataObito: [null],
            nomeGenitor: [null],
            nomeGenitora: [null],
            profissao: [null],
            nacionalidade: [null],
            naturalidade: [null],
            modalidadeQualificacaoPessoa: [null],
            modalidadeGeneroPessoa: [null],
            origemDados: [null],
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
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({nome: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('nome')) {
                        delete this.filters['nome'];
                    }
                }
            }
        });

        this.form.get('numeroDocumentoPrincipal').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').map(bit => bit.replace(/[^\d]+/g, '')).filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({numeroDocumentoPrincipal: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('numeroDocumentoPrincipal')) {
                        delete this.filters['numeroDocumentoPrincipal'];
                    }
                }
            }
        });

        this.form.get('nomeGenitor').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({nomeGenitor: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('nomeGenitor')) {
                        delete this.filters['nomeGenitor'];
                    }
                }
            }
        });

        this.form.get('nomeGenitora').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({nomeGenitora: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('nomeGenitora')) {
                        delete this.filters['nomeGenitora'];
                    }
                }
            }
        });

        this.form.get('profissao').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({profissao: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('profissao')) {
                        delete this.filters['profissao'];
                    }
                }
            }
        });

        this.form.get('dataNascimento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataNascimento: `eq:${value}`
                };
            }
        });

        this.form.get('dataObito').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataObito: `eq:${value}`
                };
            }
        });

        this.form.get('pessoaValidada').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    pessoaValidada: `eq:${value}`
                };
            }
        });

        this.form.get('pessoaRepresentada').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    pessoaRepresentada: `eq:${value}`
                };
            }
        });

        this.form.get('nacionalidade').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'nacionalidade.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('nacionalidade.id')) {
                        delete this.filters['nacionalidade.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeGeneroPessoa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeGeneroPessoa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeGeneroPessoa.id')) {
                        delete this.filters['modalidadeGeneroPessoa.id'];
                    }
                }
            }
        });

        this.form.get('naturalidade').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'naturalidade.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('naturalidade.id')) {
                        delete this.filters['naturalidade.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeQualificacaoPessoa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeQualificacaoPessoa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeQualificacaoPessoa.id')) {
                        delete this.filters['modalidadeQualificacaoPessoa.id'];
                    }
                }
            }
        });

        this.form.get('origemDados').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'origemDados.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('origemDados.id')) {
                        delete this.filters['origemDados.id'];
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
    }

    buscar(): void {
        this.emite();
        this._cdkSidebarService.getSidebar('cdk-pessoa-filter').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this._cdkSidebarService.getSidebar('cdk-pessoa-filter').close();
    }
}
