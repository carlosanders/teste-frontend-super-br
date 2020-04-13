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
    selector: 'cdk-documento-avulso-filter',
    templateUrl: './cdk-documento-avulso-filter.component.html',
    styleUrls: ['./cdk-documento-avulso-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoAvulsoFilterComponent implements OnInit {

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
            setorOrigem: [null],
            especieDocumentoAvulso: [null],
            observacao: [null],
            urgente: [null],
            modelo: [null],
            dataHoraEncerramento: [null],
            dataHoraInicioPrazo: [null],
            dataHoraFinalPrazo: [null],
            dataHoraConclusaoPrazo: [null],
            pessoaDestino: [null],
            setorDestino: [null],
            dataHoraRemessa: [null],
            dataHoraResposta: [null],
            dataHoraReiteracao: [null],
            documentoResposta: [null],
            documentoRemessa: [null],
            usuarioResponsavel: [null],
            setorResponsavel: [null],
            usuarioResposta: [null],
            usuarioRemessa: [null],
            processo: [null],
            processoDestino: [null],
            documentoAvulsoOrigem: [null],
            tarefaOrigem: [null],
            postIt: [null],
            distribuicaoAutomatica: [null],
            livreBalanceamento: [null],
            auditoriaDistribuicao: [null],
            tipoDistribuicao: [null],
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
        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    observacao: `like:${value}%`
                };
            }
        });

        this.form.get('postIt').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    postIt: `like:${value}`
                };
            }
        });

        this.form.get('auditoriaDistribuicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    auditoriaDistribuicao: `like:${value}`
                };
            }
        });

        this.form.get('urgente').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    urgente: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraEncerramento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraEncerramento: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraInicioPrazo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraInicioPrazo: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraFinalPrazo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraFinalPrazo: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraConclusaoPrazo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraConclusaoPrazo: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraRemessa').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraRemessa: `eq:${value}`
                };
            }
        });

        this.form.get('boolean').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    boolean: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraResposta').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraResposta: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraReiteracao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraReiteracao: `eq:${value}`
                };
            }
        });

        this.form.get('distribuicaoAutomatica').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    distribuicaoAutomatica: `eq:${value}`
                };
            }
        });

        this.form.get('livreBalanceamento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    livreBalanceamento: `eq:${value}`
                };
            }
        });

        this.form.get('boolean').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    boolean: `eq:${value}`
                };
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

        this.form.get('especieDocumentoAvulso').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'especieDocumentoAvulso.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('especieDocumentoAvulso.id')) {
                        delete this.filters['especieDocumentoAvulso.id'];
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

        this.form.get('unidadeResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'unidadeResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('unidadeResponsavel.id')) {
                        delete this.filters['unidadeResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('pessoaDestino').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'pessoaDestino.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('pessoaDestino.id')) {
                        delete this.filters['pessoaDestino.id'];
                    }
                }
            }
        });

        this.form.get('setorDestino').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorDestino.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setorDestino.id')) {
                        delete this.filters['setorDestino.id'];
                    }
                }
            }
        });

        this.form.get('documentoResposta').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoResposta.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoResposta.id')) {
                        delete this.filters['documentoResposta.id'];
                    }
                }
            }
        });

        this.form.get('documentoRemessa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoRemessa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoRemessa.id')) {
                        delete this.filters['documentoRemessa.id'];
                    }
                }
            }
        });

        this.form.get('usuarioResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('usuarioResponsavel.id')) {
                        delete this.filters['usuarioResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('setorResponsavel').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorResponsavel.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setorResponsavel.id')) {
                        delete this.filters['setorResponsavel.id'];
                    }
                }
            }
        });

        this.form.get('usuarioResposta').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioResposta.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('usuarioResposta.id')) {
                        delete this.filters['usuarioResposta.id'];
                    }
                }
            }
        });

        this.form.get('usuarioRemessa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioRemessa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('usuarioRemessa.id')) {
                        delete this.filters['usuarioRemessa.id'];
                    }
                }
            }
        });

        this.form.get('processo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'processo.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('processo.id')) {
                        delete this.filters['processo.id'];
                    }
                }
            }
        });

        this.form.get('processoDestino').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'processoDestino.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('processoDestino.id')) {
                        delete this.filters['processoDestino.id'];
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
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-filter').close();
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
