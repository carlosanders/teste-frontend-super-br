import {
    ChangeDetectionStrategy,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    Component,
    Output,
    Input
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-colaborador-filter',
    templateUrl: './cdk-colaborador-filter.component.html',
    styleUrls: ['./cdk-colaborador-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkColaboradorFilterComponent implements OnInit {

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
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'cargo.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('cargo.id')) {
                        delete this.filters['cargo.id'];
                    }
                }
            }
        });

        this.form.get('modalidadeColaborador').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeColaborador.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeColaborador.id')) {
                        delete this.filters['modalidadeColaborador.id'];
                    }
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
                } else {
                    if (this.filters.hasOwnProperty('usuario.id')) {
                        delete this.filters['usuario.id'];
                    }
                }
            }
        });

        if (this.form.get('criadoEm')) {
            this.form.get('criadoEm').valueChanges.subscribe(value => {
                if (value !== null) {
                    this.filters = {
                        ...this.filters,
                        criadoEm: `eq:${value}`
                    };
                }
            });
        }

        if (this.form.get('atualizadoEm')) {
            this.form.get('atualizadoEm').valueChanges.subscribe(value => {
                if (value !== null) {
                    this.filters = {
                        ...this.filters,
                        atualizadoEm: `eq:${value}`
                    };
                }
            });
        }

        if (this.form.get('apagadoEm')) {
            this.form.get('apagadoEm').valueChanges.subscribe(value => {
                if (value !== null) {
                    this.filters = {
                        ...this.filters,
                        apagadoEm: `eq:${value}`
                    };
                }
            });
        }

        if (this.form.get('criadoPor')) {
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
        }

        if (this.form.get('atualizadoPor')) {
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
        }

        if (this.form.get('apagadoPor')) {
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
    }

    emite(): void {
        const request = {
            filters: this.filters
        };
        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-classificacao-filter').close();
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

