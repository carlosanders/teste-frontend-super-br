import {
    ChangeDetectionStrategy,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-processo-filter',
    templateUrl: './cdk-processo-filter.component.html',
    styleUrls: ['./cdk-processo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    contexto: any = {};

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
            processo: [null],
            descricao: [null],
            valorEconomico: [null],
            semValorEconomico: [null],
            NUP: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            dataHoraAbertura: [null],
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
            origemDados: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
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
                this.filters = {
                    ...this.filters,
                    NUP: `like:${value}%`
                };
            }
        });

        this.form.get('nome').valueChanges.subscribe(value => {
            if (value !== null) {
                if (this.mode === 'search') {
                    this.filters = {
                        ...this.filters,
                        'interessados.pessoa.nome': `like:${value}%`
                    };
                }
            }
        });

        this.form.get('cpfCnpj').valueChanges.subscribe(value => {
            if (value !== null) {
                if (this.mode === 'search') {
                    this.filters = {
                        ...this.filters,
                        'interessados.pessoa.numeroDocumentoPrincipal': `like:${value}%`
                    };
                }
            }
        });

        this.form.get('titulo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    titulo: `like:${value}%`
                };
            }
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    descricao: `like:${value}%`
                };
            }
        });

        this.form.get('outroNumero').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    outroNumero: `like:${value}%`
                };
            }
        });

        this.form.get('valorEconomico').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    valorEconomico: `like:${value}%`
                };
            }
        });

        this.form.get('dataHoraAbertura').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraAbertura: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraProximaTransicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraProximaTransicao: `eq:${value}`
                };
            }
        });

        this.form.get('novo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    novo: `eq:${value}`
                };
            }
        });

        this.form.get('semValorEconomico').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    semValorEconomico: `eq:${value}`
                };
            }
        });

        this.form.get('visibilidadeExterna').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    visibilidadeExterna: `eq:${value}`
                };
            }
        });

        this.form.get('acessoNegado').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    acessoNegado: `eq:${value}`
                };
            }
        });

        this.form.get('classificacao').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'classificacao.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('classificacao.id')) {
                        delete this.filters['classificacao.id'];
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

        this.form.get('documentoAvulsoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoAvulsoOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoAvulsoOrigem.id')) {
                        delete this.filters['documentoAvulsoOrigem.id'];
                    }
                }
            }
        });

        this.form.get('procedencia').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'procedencia.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('procedencia.id')) {
                        delete this.filters['procedencia.id'];
                    }
                }
            }
        });

        this.form.get('localizador').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'localizador.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('localizador.id')) {
                        delete this.filters['localizador.id'];
                    }
                }
            }
        });

        this.form.get('setorAtual').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorAtual.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setorAtual.id')) {
                        delete this.filters['setorAtual.id'];
                    }
                }
            }
        });

        this.form.get('setorInicial').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorInicial.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setorInicial.id')) {
                        delete this.filters['setorInicial.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeFase').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeFase.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeFase.id')) {
                        delete this.filters['modalidadeFase.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeMeio').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeMeio.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('modalidadeMeio.id')) {
                        delete this.filters['modalidadeMeio.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });

        this.form.get('especieProcesso').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'especieProcesso.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('especieProcesso.id')) {
                        delete this.filters['especieProcesso.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    criadoEm: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    atualizadoEm: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    apagadoEm: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'criadoPor.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('criadoPor.id')) {
                        delete this.filters['criadoPor.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('atualizadoPor.id')) {
                        delete this.filters['atualizadoPor.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('apagadoPor.id')) {
                        delete this.filters['apagadoPor.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });
    }

    validaBusca(): boolean {
        return true;
    }

    emite(): void {
        if (this.mode === 'list') {
            const request = {
                filters: this.filters
            };
            this.selected.emit(request);
        }
    }

    buscar(): void {
        const request = {
            filters: this.filters,
            contexto: this.contexto
        };
        this.selected.emit(request);
    }

    limpar(): void {
        this.filters = {};
        this.contexto = {};
        this.emite();
        this.form.reset();
    }

}
