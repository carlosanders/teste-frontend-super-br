import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-afastamento-grid-filter',
    templateUrl: './cdk-afastamento-grid-filter.component.html',
    styleUrls: ['./cdk-afastamento-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAfastamentoGridFilterComponent implements OnInit {

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
            modalidadeAfastamento: [null],
            colaborador: [null],
            dataInicio: [null],
            dataInicioBloqueio: [null],
            dataFim: [null],
            dataFimBloqueio: [null],
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
        this.form.get('dataInicio').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataInicio: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('dataInicioBloqueio').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataInicioBloqueio: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('dataFim').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataFim: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('dataFimBloqueio').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataFimBloqueio: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('colaborador').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'colaborador.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('colaborador.id')) {
                        delete this.filters['colaborador.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('modalidadeAfastamento').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeAfastamento.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('modalidadeAfastamento.id')) {
                        delete this.filters['modalidadeAfastamento.id'];
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

