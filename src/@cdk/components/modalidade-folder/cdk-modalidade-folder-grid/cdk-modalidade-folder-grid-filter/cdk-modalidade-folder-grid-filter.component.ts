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
    selector: 'cdk-modalidade-folder-grid-filter',
    templateUrl: './cdk-modalidade-folder-grid-filter.component.html',
    styleUrls: ['./cdk-modalidade-folder-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeFolderGridFilterComponent implements OnInit {

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
            valor: [null],
            descricao: [null],
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
        this.form.get('valor').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    valor: `like:${value}%`
                };
            }
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    descricao: `like:${value}%`
                };
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
        this._cdkSidebarService.getSidebar('cdk-modalidade-folder-main-sidebar').close();
    }

    limpar(): void {
        this.filters = {};
        this.emite();
        this.form.reset();
        this._cdkSidebarService.getSidebar('cdk-modalidade-folder-main-sidebar').close();
    }
}


