import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-pessoa-grid-filter',
    templateUrl: './cdk-pessoa-grid-filter.component.html',
    styleUrls: ['./cdk-pessoa-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkPessoaGridFilterComponent implements OnInit {

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
            nome: [null],
            naturalidade: [null],
            profissao: [null],
            contato: [null],
            pessoaValidada: [null],
            dataNascimento: [null],
            dataObito: [null],
            nacionalidade: [null],
            numeroDocumentoPrincipal: [null],
            nomeGenitor: [null],
            nomeGenitora: [null],
            modalidadeGeneroPessoa: [null],
            modalidadeQualificacaoPessoa: [null],
            origemDados: [null],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('nome').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                nome: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('numeroDocumentoPrincipal').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                numeroDocumentoPrincipal: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('nomeGenitor').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                nomeGenitor: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('nomeGenitora').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                nomeGenitora: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('profissao').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                profissao: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('dataNascimento').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                dataNascimento: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('dataObito').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                dataObito: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('pessoaValidada').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                pessoaValidada: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('nacionalidade').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'nacionalidade.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('nacionalidade.id')) {
                    delete this.filters['nacionalidade.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('modalidadeGeneroPessoa').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'modalidadeGeneroPessoa.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('modalidadeGeneroPessoa.id')) {
                    delete this.filters['modalidadeGeneroPessoa.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('naturalidade').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'naturalidade.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('naturalidade.id')) {
                    delete this.filters['naturalidade.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('modalidadeQualificacaoPessoa').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'modalidadeQualificacaoPessoa.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('modalidadeQualificacaoPessoa.id')) {
                    delete this.filters['modalidadeQualificacaoPessoa.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('origemDados').valueChanges.subscribe(value => {
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
