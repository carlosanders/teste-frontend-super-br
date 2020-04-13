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
    selector: 'cdk-distribuicao-filter',
    templateUrl: './cdk-distribuicao-filter.component.html',
    styleUrls: ['./cdk-distribuicao-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDistribuicaoFilterComponent implements OnInit {

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
            }
        });

        this.form.get('auditoriaDistribuicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    auditoriaDistribuicao: `like:${value}%`
                };
            }
        });

        this.form.get('tipoDistribuicao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    tipoDistribuicao: `like:${value}%`
                };
            }
        });

        this.form.get('distribuicaoAutomatica').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    distribuicaoAutomatica: `eq:${value}`
                };
            }
        });

        this.form.get('livreBalanceamento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    livreBalanceamento: `eq:${value}`
                };
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

        this.form.get('documentoAvulso').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'documentoAvulso.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('documentoAvulso.id')) {
                        delete this.filters['documentoAvulso.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('usuarioAnterior.id')) {
                        delete this.filters['usuarioAnterior.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('usuarioPosterior.id')) {
                        delete this.filters['usuarioPosterior.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('setorAnterior.id')) {
                        delete this.filters['setorAnterior.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('setorPosterior.id')) {
                        delete this.filters['setorPosterior.id'];
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
        this._cdkSidebarService.getSidebar('cdk-distribuicao-filter').close();
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
