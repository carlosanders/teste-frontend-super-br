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
    selector: 'cdk-origem-dados-filter',
    templateUrl: './cdk-origem-dados-filter.component.html',
    styleUrls: ['./cdk-origem-dados-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkOrigemDadosFilterComponent implements OnInit {

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
            idExterno: [null],
            servico: [null],
            fonteDados: [null],
            status: [null],
            dataHoraUltimaConsulta: [null],
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
        this.form.get('idExterno').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({idExterno: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('idExterno')) {
                    delete this.filters['idExterno'];
                }
            }
        });

        this.form.get('servico').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({servico: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('servico')) {
                    delete this.filters['servico'];
                }
            }
        });

        this.form.get('fonteDados').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({fonteDados: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('fonteDados')) {
                    delete this.filters['fonteDados'];
                }
            }
        });

        this.form.get('status').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    status: `like:${value}%`
                };
            }
        });

        this.form.get('dataHoraUltimaConsulta').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraUltimaConsulta: `eq:${value}`
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
        this._cdkSidebarService.getSidebar('cdk-origem-dados-filter').close();
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
