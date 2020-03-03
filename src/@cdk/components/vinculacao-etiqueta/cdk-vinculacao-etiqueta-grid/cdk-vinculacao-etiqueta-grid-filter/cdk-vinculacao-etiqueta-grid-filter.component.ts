import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-vinculacao-etiqueta-grid-filter',
    templateUrl: './cdk-vinculacao-etiqueta-grid-filter.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaGridFilterComponent implements OnInit {

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
            conteudo: [null],
            privada: [null],
            dataHoraExpiracao: [null],
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
        this.form.get('conteudo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    conteudo: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('privada').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    privada: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('dataHoraExpiracao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraExpiracao: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('etiqueta').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'etiqueta.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('etiqueta.id')) {
                        delete this.filters['etiqueta.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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

        this.form.get('documento').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documento.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('documento.id')) {
                        delete this.filters['documento.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('processo.id')) {
                        delete this.filters['processo.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('usuario.id')) {
                        delete this.filters['usuario.id'];
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
