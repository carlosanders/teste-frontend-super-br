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
    selector: 'cdk-sigilo-filter',
    templateUrl: './cdk-sigilo-filter.component.html',
    styleUrls: ['./cdk-sigilo-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSigiloFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    @Input()
    mode = 'list';

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            desclassificado: [null],
            observacao: [null],
            codigoIndexacao: [null],
            fundamentoLegal: [null],
            razoesClassificacaoSigilo: [null],
            dataHoraInicioSigilo: [null],
            dataHoraValidadeSigilo: [null],
            nivelAcesso: [null],
            modalidadeCategoriaSigilo: [null],
            tipoSigilo: [null],
            processo: [null],
            documento: [null],
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
        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    observacao: `like:${value}%`
                };
            }
        });

        this.form.get('codigoIndexacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    codigoIndexacao: `like:${value}%`
                };
            }
        });

        this.form.get('fundamentoLegal').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    fundamentoLegal: `like:${value}%`
                };
            }
        });

        this.form.get('razoesClassificacaoSigilo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    razoesClassificacaoSigilo: `like:${value}%`
                };
            }
        });

        this.form.get('nivelAcesso').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    nivelAcesso: `like:${value}%`
                };
            }
        });

        this.form.get('desclassificado').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    desclassificado: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraValidadeSigilo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraValidadeSigilo: `eq:${value}`
                };
            }
        });

        this.form.get('dataHoraInicioSigilo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraInicioSigilo: `eq:${value}`
                };
            }
        });

        this.form.get('modalidadeCategoriaSigilo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeCategoriaSigilo.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeCategoriaSigilo.id')) {
                        delete this.filters['modalidadeCategoriaSigilo.id'];
                    }
                }
            }
        });

        this.form.get('tipoSigilo').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'tipoSigilo.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('tipoSigilo.id')) {
                        delete this.filters['tipoSigilo.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('processo.id')) {
                        delete this.filters['processo.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('documento.id')) {
                        delete this.filters['documento.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('origemDados.id')) {
                        delete this.filters['origemDados.id'];
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
        this._cdkSidebarService.getSidebar('cdk-sigilo-filter').close();
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
    }
}

