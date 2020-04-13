import {
    ChangeDetectionStrategy,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-componente-digital-filter',
    templateUrl: './cdk-componente-digital-filter.component.html',
    styleUrls: ['./cdk-componente-digital-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'list';

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
            }
        });

        this.form.get('codigo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    id: `eq:${value}`
                };
            }
        });

        this.form.get('extensao').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    extensao: `like:${value}%`
                };
            }
        });

        this.form.get('editavel').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    editavel: `eq:${value}`
                };
            }
        });

        this.form.get('assinado').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    assinado: `eq:${value}`
                };
            }
        });

        this.form.get('processoOrigem').valueChanges.subscribe(value => {
            if (value !== null) {
                if (typeof value === 'object' && value) {
                    this.filters = {
                        ...this.filters,
                        'processoOrigem.id': `eq:${value.id}`
                    };
                } else {
                    if (this.filters.hasOwnProperty('processoOrigem.id')) {
                        delete this.filters['processoOrigem.id'];
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

    emite(): void {
        const request = {
            filters: this.filters
        };
        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-componente-digital-filter').close();
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

