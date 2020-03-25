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
    selector: 'cdk-classificacao-grid-filter',
    templateUrl: './cdk-classificacao-grid-filter.component.html',
    styleUrls: ['./cdk-classificacao-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkClassificacaoGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            modalidadeDestinacao: [null],
            prazoGuardaFaseCorrenteAno: [null],
            prazoGuardaFaseCorrenteDia: [null],
            prazoGuardaFaseCorrenteMes: [null],
            prazoGuardaFaseCorrenteEvento: [null],
            prazoGuardaFaseIntermediariaDia: [null],
            prazoGuardaFaseIntermediariaMes: [null],
            prazoGuardaFaseIntermediariaAno: [null],
            prazoGuardaFaseIntermediariaEvento: [null],
            codigo: [null],
            permissaoUso: [null],
            observacao: [null],
            parent: [null],
            ativo: [null],
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
        this.form.get('nome').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    nome: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseCorrenteEvento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseCorrenteEvento: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseIntermediariaEvento').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseIntermediariaEvento: `like:${value}%`
                };
            }
        });

        this.form.get('codigo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    codigo: `like:${value}%`
                };
            }
        });

        this.form.get('observacao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    observacao: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseCorrenteAno').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseCorrenteAno: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseCorrenteMes').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseCorrenteMes: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseCorrenteDia').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseCorrenteDia: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseIntermediariaAno').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseIntermediariaAno: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseIntermediariaMes').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseIntermediariaMes: `like:${value}%`
                };
            }
        });

        this.form.get('prazoGuardaFaseIntermediariaDia').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    prazoGuardaFaseIntermediariaDia: `like:${value}%`
                };
            }
        });

        this.form.get('permissaoUso').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    permissaoUso: `eq:${value}`
                };
            }
        });

        this.form.get('parent').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'parent.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('parent.id')) {
                        delete this.filters['parent.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeDestinacao').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeDestinacao.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeDestinacao.id')) {
                        delete this.filters['modalidadeDestinacao.id'];
                    }
                }
            }
        });

        this.form.get('ativo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    ativo: `eq:${value}`
                };
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
    }

    buscar(): void {
        this.emite();
        this._cdkSidebarService.getSidebar('cdk-classificacao-main-sidebar').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this._cdkSidebarService.getSidebar('cdk-classificacao-main-sidebar').close();
    }
}

