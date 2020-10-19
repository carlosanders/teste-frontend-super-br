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
    selector: 'cdk-assinatura-filter',
    templateUrl: './cdk-assinatura-filter.component.html',
    styleUrls: ['./cdk-assinatura-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssinaturaFilterComponent implements OnInit {

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
            algoritmoHash: [null],
            assinatura: [null],
            cadeiaCertificadoPEM: [null],
            cadeiaCertificadoPkiPath: [null],
            dataHoraAssinatura: [null],
            componenteDigital: [null],
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
        this.form.get('algoritmoHash').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({algoritmoHash: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('algoritmoHash')) {
                    delete this.filters['algoritmoHash'];
                }
            }
        });

        this.form.get('assinatura').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({assinatura: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('assinatura')) {
                    delete this.filters['assinatura'];
                }
            }
        });

        this.form.get('cadeiaCertificadoPEM').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({cadeiaCertificadoPEM: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('cadeiaCertificadoPEM')) {
                    delete this.filters['cadeiaCertificadoPEM'];
                }
            }
        });

        this.form.get('cadeiaCertificadoPkiPath').valueChanges.subscribe(value => {
            const andxFilter = [];
            value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach(bit => {
                andxFilter.push({cadeiaCertificadoPkiPath: `like:%${bit}%`});
            });
            if (andxFilter.length > 0) {
                this.filters = {
                    ...this.filters,
                    andX: andxFilter
                };
            } else {
                if (this.filters.hasOwnProperty('cadeiaCertificadoPkiPath')) {
                    delete this.filters['cadeiaCertificadoPkiPath'];
                }
            }
        });

        this.form.get('dataHoraAssinatura').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraAssinatura: `eq:${value}`
                };
            }
        });

        this.form.get('componenteDigital').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'componenteDigital.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('componenteDigital.id')) {
                        delete this.filters['componenteDigital.id'];
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
        this._cdkSidebarService.getSidebar('cdk-assinatura-filter').close();
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
