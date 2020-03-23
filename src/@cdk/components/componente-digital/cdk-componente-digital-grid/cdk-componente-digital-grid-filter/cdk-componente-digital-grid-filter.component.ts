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

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            conteudo: [null],
            tamanho: [null],
            extensao: [null],
            processoOrigem: [null],
            editavel: [null],
            assinado: [null],
            criadoPor: [null],
            criadoEm: [null],
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
        this.form.get('conteudo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    conteudo: value
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

        this.form.get('extensao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    extensao: `like:${value}%`
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

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    criadoEm: `eq:${value}`
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

