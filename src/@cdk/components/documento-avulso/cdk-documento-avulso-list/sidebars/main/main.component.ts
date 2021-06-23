import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';


@Component({
    selector   : 'cdk-documento-avulso-list-filter',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss'],
    animations   : cdkAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: MAT_LABEL_GLOBAL_OPTIONS,
            useValue: {float: 'never' }
        }
    ]
})
export class CdkDocumentoAvulsoListMainSidebarComponent implements OnInit
{
    @Output()
    selected = new EventEmitter<any>();

    @Input()
    mode = 'horizontal';

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _cdkSidebarService: CdkSidebarService,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            processo: [null],
            setorOrigem: [null],
            dataHoraRemessa: [null]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('processo').valueChanges.subscribe((value) => {
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
        });

        this.form.get('setorOrigem').valueChanges.subscribe((value) => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'setorOrigem.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('setorOrigem.id')) {
                    delete this.filters['setorOrigem.id'];
                }
            }
        });

        this.form.get('dataHoraRemessa').valueChanges.subscribe((value) => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    dataHoraRemessa: `eq:${value}`
                };
            }
        });
    }

    pesquisar(): void {
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-list-filter').toggleOpen();
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-documento-avulso-list-filter').toggleOpen();
        this.form.reset();
    }
}
