import {
    ChangeDetectionStrategy,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-modelo-grid-filter',
    templateUrl: './cdk-vinculacao-modelo-grid-filter.component.html',
    styleUrls: ['./cdk-vinculacao-modelo-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoModeloGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    orgaoCentralPagination: Pagination;

    @Input()
    modeloPagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            modelo: [null],
            especieSetor: [null],
            setor: [null],
            usuario: [null],
            orgaoCentral: [null],
            criadoPor: [null],
            criadoEm: [null],
            atualizadoPor: [null],
            atualizadoEm: [null],
            apagadoPor: [null],
            apagadoEm: [null],
        });

        this.orgaoCentralPagination = new Pagination();
        this.modeloPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.usuarioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('modelo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modelo.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('modelo.id')) {
                        delete this.filters['modelo.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
                }
            }
        });

        this.form.get('especieSetor').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'especieSetor.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('especieSetor.id')) {
                        delete this.filters['especieSetor.id'];
                    }
                }
                if (!value) {
                    this.selected.emit(this.filters);
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
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('setor.id')) {
                        delete this.filters['setor.id'];
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

        this.form.get('orgaoCentral').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'orgaoCentral.id': `eq:${value.id}`
                    };
                    this.selected.emit(this.filters);
                } else {
                    if (this.filters.hasOwnProperty('orgaoCentral.id')) {
                        delete this.filters['orgaoCentral.id'];
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
