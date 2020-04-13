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
    selector: 'cdk-atividade-filter',
    templateUrl: './cdk-atividade-filter.component.html',
    styleUrls: ['./cdk-atividade-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAtividadeFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            dataHoraConclusao: [null],
            observacao: [null],
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            especieAtividade: [null],
            setor: [null],
            usuario: [null],
            usuarioAprovacao: [null],
            setorAprovacao: [null],
            tarefa: [null],
            documentos: [null],
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

        this.form.get('destinacaoMinutas').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    destinacaoMinutas: `like:${value}%`
                };
            }
        });

        this.form.get('encerraTarefa').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    encerraTarefa: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraConclusao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraConclusao: `eq:${value}`
                };
            }
        });

        this.form.get('especieAtividade').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'especieAtividade.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('especieAtividade.id')) {
                        delete this.filters['especieAtividade.id'];
                    }
                }
            }
        });

        this.form.get('setor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setor.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setor.id')) {
                        delete this.filters['setor.id'];
                    }
                }
            }
        });

        this.form.get('usuario').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuario.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('usuario.id')) {
                        delete this.filters['usuario.id'];
                    }
                }
            }
        });

        this.form.get('usuarioAprovacao').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioAprovacao.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('usuarioAprovacao.id')) {
                        delete this.filters['usuarioAprovacao.id'];
                    }
                }
            }
        });

        this.form.get('setorAprovacao').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorAprovacao.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('setorAprovacao.id')) {
                        delete this.filters['setorAprovacao.id'];
                    }
                }
            }
        });

        this.form.get('tarefa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'tarefa.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('tarefa.id')) {
                        delete this.filters['tarefa.id'];
                    }
                }
            }
        });

        this.form.get('documentos').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentos.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentos.id')) {
                        delete this.filters['documentos.id'];
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
        this._cdkSidebarService.getSidebar('cdk-atividade-filter').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this._cdkSidebarService.getSidebar('cdk-atividade-filter').close();
    }
}
