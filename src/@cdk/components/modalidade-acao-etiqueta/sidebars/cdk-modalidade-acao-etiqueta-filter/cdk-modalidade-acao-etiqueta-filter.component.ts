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
    selector: 'cdk-modalidade-acao-etiqueta-filter',
    templateUrl: './cdk-modalidade-acao-etiqueta-filter.component.html',
    styleUrls: ['./cdk-modalidade-acao-etiqueta-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeAcaoEtiquetaFilterComponent implements OnInit {

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
            valor: [null],
            descricao: [null],
            modalidadeEtiqueta: [null],
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
        this.form.get('valor').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({valor: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('valor')) {
                    delete this.filters['valor'];
                }
            }
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            if (value !== null) {
                const andxFilter = [];
                value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                    andxFilter.push({descricao: `like:%${bit}%`});
                });
                if (andxFilter.length > 0) {
                    this.filters = {
                        ...this.filters,
                        andX: andxFilter
                    };
                } else {
                    if (this.filters.hasOwnProperty('descricao')) {
                        delete this.filters['descricao'];
                    }
                }
            }
        });
        
        this.form.get('modalidadeEtiqueta').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'modalidadeEtiqueta.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('modalidadeEtiqueta.id')) {
                        delete this.filters['modalidadeEtiqueta.id'];
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
        this._cdkSidebarService.getSidebar('cdk-modalidade-acao-etiqueta-filter').close();
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
