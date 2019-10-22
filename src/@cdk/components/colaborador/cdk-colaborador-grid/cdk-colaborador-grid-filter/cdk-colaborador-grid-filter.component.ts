import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-colaborador-grid-filter',
    templateUrl: './cdk-colaborador-grid-filter.component.html',
    styleUrls: ['./cdk-colaborador-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkColaboradorGridFilterComponent implements OnInit {

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
            cargo: [null],
            modalidadeColaborador: [null],
            usuario: [null],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('cargo').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'cargo.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('cargo.id')) {
                    delete this.filters['cargo.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('modalidadeColaborador').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'modalidadeColaborador.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('modalidadeColaborador.id')) {
                    delete this.filters['modalidadeColaborador.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('usuario').valueChanges.subscribe(value => {
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
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                criadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                atualizadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                apagadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
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
        });

        this.form.get('atualizadoPor').valueChanges.subscribe(value => {
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
        });

        this.form.get('apagadoPor').valueChanges.subscribe(value => {
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
        });
    }

}

