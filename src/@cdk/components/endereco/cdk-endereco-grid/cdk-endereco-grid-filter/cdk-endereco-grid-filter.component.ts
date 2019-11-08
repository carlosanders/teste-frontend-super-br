import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-endereco-grid-filter',
    templateUrl: './cdk-endereco-grid-filter.component.html',
    styleUrls: ['./cdk-endereco-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEnderecoGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            bairro: [null],
            cep: [null],
            municipio: [null],
            complemento: [null],
            logradouro: [null],
            numero: [null],
            pais: [null],
            principal: [null],
            observacao: [null],
            pessoa: [null],
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
        this.form.get('bairro').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    bairro: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('cep').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    cep: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('complemento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    complemento: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('logradouro').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    logradouro: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('numero').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    numero: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    observacao: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('principal').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    principal: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('municipio').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'municipio.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('municipio.id')) {
                        delete this.filters['municipio.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('pais').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'pais.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('pais.id')) {
                        delete this.filters['pais.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('origemDados.id')) {
                        delete this.filters['origemDados.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('pessoa').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'pessoa.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('pessoa.id')) {
                        delete this.filters['pessoa.id'];
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
