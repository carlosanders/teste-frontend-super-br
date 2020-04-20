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
    selector: 'cdk-documento-filter',
    templateUrl: './cdk-documento-filter.component.html',
    styleUrls: ['./cdk-documento-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoFilterComponent implements OnInit {

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
            numeroFolhas: [null],
            dataHoraProducao: [null],
            outroNumero: [null],
            semEfeito: [null],
            localizadorOriginal: [null],
            localProducao: [null],
            autor: [null],
            processoOrigem: [null],
            documentoOrigem: [null],
            redator: [null],
            procedencia: [null],
            tipoDocumento: [null],
            descricaoOutros: [null],
            observacao: [null],
            copia: [null],
            setorOrigem: [null],
            tarefaOrigem: [null],
            origemDados: [null],
            modelo: [null],
            juntadaAtual: [null],
            repositorio: [null],
            documentoAvulsoRemessa: [null],
            vinculacaoDocumentoPrincipal: [null],
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
        this.form.get('descricaoOutros').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    descricaoOutros: `like:${value}%`
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

        this.form.get('redator').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    redator: `like:${value}%`
                };
            }
        });

        this.form.get('localizadorOriginal').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    localizadorOriginal: `like:${value}%`
                };
            }
        });

        this.form.get('localProducao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    localProducao: `like:${value}%`
                };
            }
        });

        this.form.get('autor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    autor: `like:${value}%`
                };
            }
        });

        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    observacao: `like:${value}%`
                };
            }
        });

        this.form.get('numeroFolhas').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    numeroFolhas: `like:${value}%`
                };
            }
        });

        this.form.get('semEfeito').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    semEfeito: `eq:${value}`
                };
            }
        });

        this.form.get('copia').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    copia: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraProducao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraProducao: `eq:${value}`
                };
            }
        });

        this.form.get('processoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'processoOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('processoOrigem.id')) {
                        delete this.filters['processoOrigem.id'];
                    }
                }
            }
        });

        this.form.get('documentoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoOrigem.id')) {
                        delete this.filters['documentoOrigem.id'];
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

        this.form.get('tipoDocumento').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'tipoDocumento.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('tipoDocumento.id')) {
                        delete this.filters['tipoDocumento.id'];
                    }
                }
            }
        });

        this.form.get('setorOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorOrigem.id': `eq:${value.id}`
                    };
                    
                } else {
                    if (this.filters.hasOwnProperty('setorOrigem.id')) {
                        delete this.filters['setorOrigem.id'];
                    }
                }
            }
        });

        this.form.get('tarefaOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'tarefaOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('tarefaOrigem.id')) {
                        delete this.filters['tarefaOrigem.id'];
                    }
                }
            }
        });

        this.form.get('juntadaAtual').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'juntadaAtual.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('juntadaAtual.id')) {
                        delete this.filters['juntadaAtual.id'];
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

        this.form.get('documentoAvulsoRemessa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoAvulsoRemessa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoAvulsoRemessa.id')) {
                        delete this.filters['documentoAvulsoRemessa.id'];
                    }
                }
            }
        });

        this.form.get('modelo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modelo.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modelo.id')) {
                        delete this.filters['modelo.id'];
                    }
                }
            }
        });

        this.form.get('repositorio').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'repositorio.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('repositorio.id')) {
                        delete this.filters['repositorio.id'];
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
        this._cdkSidebarService.getSidebar('cdk-documento-filter').close();
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