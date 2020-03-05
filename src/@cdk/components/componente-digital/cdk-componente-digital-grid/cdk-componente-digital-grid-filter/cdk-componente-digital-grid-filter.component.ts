import {
    ChangeDetectionStrategy,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-componente-digital-grid-filter',
    templateUrl: './cdk-componente-digital-grid-filter.component.html',
    styleUrls: ['./cdk-componente-digital-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

    @Input()
    required: boolean;

    form: FormGroup;

    filters: any = '{}';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            fileName: [null],
            hash: [null],
            numeracaoSequencial: [null],
            conteudo: [null],
            tamanho: [null],
            highlights: [null],
            nivelComposicao: [null],
            softwareCriacao: [null],
            chaveInibidor: [null],
            dataHoraSoftwareCriacao: [null],
            versaoSoftwareCriacao: [null],
            mimetype: [null],
            dataHoraLockEdicao: [null],
            usernameLockEdicao: [null],
            extensao: [null],
            processoOrigem: [null],
            documentoOrigem: [null],
            tarefaOrigem: [null],
            documentoAvulsoOrigem: [null],
            editavel: [null],
            assinado: [null],
            modalidadeAlvoInibidor: [null],
            modalidadeTipoInibidor: [null],
            modelo: [null],
            documento: [null],
            origemDados: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
            codigo: [null]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('fileName').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    fileName: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('highlights').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    highlights: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('conteudo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    conteudo: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('softwareCriacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    softwareCriacao: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('chaveInibidor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    chaveInibidor: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('codigo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    id: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('versaoSoftwareCriacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    versaoSoftwareCriacao: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('mimetype').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    mimetype: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('extensao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    extensao: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('hash').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    hash: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('usernameLockEdicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    usernameLockEdicao: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('numeracaoSequencial').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    numeracaoSequencial: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('tamanho').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    tamanho: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('nivelComposicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    nivelComposicao: `like:${value}%`
                };
                this.emite();
            }
        });

        this.form.get('editavel').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    editavel: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('assinado').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    assinado: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('dataHoraSoftwareCriacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraSoftwareCriacao: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('dataHoraLockEdicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraLockEdicao: `eq:${value}`
                };
                this.emite();
            }
        });

        this.form.get('modalidadeAlvoInibidor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeAlvoInibidor.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('modalidadeAlvoInibidor.id')) {
                        delete this.filters['modalidadeAlvoInibidor.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });

        this.form.get('modalidadeTipoInibidor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeTipoInibidor.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('modalidadeTipoInibidor.id')) {
                        delete this.filters['modalidadeTipoInibidor.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('modelo.id')) {
                        delete this.filters['modelo.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });

        this.form.get('documento').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documento.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('documento.id')) {
                        delete this.filters['documento.id'];
                    }
                }
                if (!value) {
                    this.emite();
                }
            }
        });

        this.form.get('processoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'processoOrigem.id': `eq:${value.id}`
                    };
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('processoOrigem.id')) {
                        delete this.filters['processoOrigem.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('documentoOrigem.id')) {
                        delete this.filters['documentoOrigem.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('tarefaOrigem.id')) {
                        delete this.filters['tarefaOrigem.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('documentoAvulsoOrigem.id')) {
                        delete this.filters['documentoAvulsoOrigem.id'];
                    }
                }
                if (!value) {
                    this.emite();
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
                    this.emite();
                } else {
                    if (this.filters.hasOwnProperty('origemDados.id')) {
                        delete this.filters['origemDados.id'];
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

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this.form.reset();
    }

    emite(): void {
        if (this.mode === 'list') {
            this.selected.emit(this.filters);
        }
    }

    buscar(): void {
        this.selected.emit(this.filters);
    }
}

