import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-distribuicao-grid-filter',
    templateUrl: './cdk-distribuicao-grid-filter.component.html',
    styleUrls: ['./cdk-distribuicao-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDistribuicaoGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = '{}';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            tarefa: [null],
            documentoAvulso: [null],
            dataHoraFinalPrazo: [null],
            usuarioAnterior: [null],
            usuarioPosterior: [null],
            setorAnterior: [null],
            setorPosterior: [null],
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
        this.form.get('dataHoraFinalPrazo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraFinalPrazo: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('auditoriaDistribuicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    auditoriaDistribuicao: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('tipoDistribuicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    tipoDistribuicao: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('distribuicaoAutomatica').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    distribuicaoAutomatica: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('livreBalanceamento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    livreBalanceamento: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('tarefa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'tarefa.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('tarefa.id')) {
                        delete this.filters['tarefa.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('documentoAvulso').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoAvulso.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('documentoAvulso.id')) {
                        delete this.filters['documentoAvulso.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('usuarioAnterior').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioAnterior.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('usuarioAnterior.id')) {
                        delete this.filters['usuarioAnterior.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('usuarioPosterior').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'usuarioPosterior.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('usuarioPosterior.id')) {
                        delete this.filters['usuarioPosterior.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('setorAnterior').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorAnterior.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('setorAnterior.id')) {
                        delete this.filters['setorAnterior.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('setorPosterior').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'setorPosterior.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('setorPosterior.id')) {
                        delete this.filters['setorPosterior.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    criadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    atualizadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    apagadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'criadoPor.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('criadoPor.id')) {
                        delete this.filters['criadoPor.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('atualizadoPor.id')) {
                        delete this.filters['atualizadoPor.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('apagadoPor.id')) {
                        delete this.filters['apagadoPor.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this.form.reset();
    }

}
