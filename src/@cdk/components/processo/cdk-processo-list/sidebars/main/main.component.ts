import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { cdkAnimations } from '@cdk/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';
import {map, startWith} from 'rxjs/operators';
import {Interessado, Pagination, Processo} from '../../../../../models';

@Component({
    selector   : 'cdk-processo-list-filter',
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
export class CdkProcessoListMainSidebarComponent implements OnInit
{
    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};
    private activeCard: string;

    @Input()
    interessadoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _cdkSidebarService: CdkSidebarService,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            processo: [null],
            especieProcesso: [null],
            interessado: [null],
            assunto: [null],
            dataHoraAbertura: [null],
            dataHoraProximaTransicao: [null],
            etiqueta: [null],
            minuta: [null]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('processo').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    id: `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('id')) {
                    delete this.filters['id'];
                }
            }
        });

        this.form.get('especieProcesso').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'especieProcesso.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('especieProcesso.id')) {
                    delete this.filters['especieProcesso.id'];
                }
            }
        });

        this.form.get('interessado').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'interessado.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('interessado.id')) {
                    delete this.filters['interessado.id'];
                }
            }
        });

        this.form.get('assunto').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'assunto.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('assunto.id')) {
                    delete this.filters['assunto.id'];
                }
            }
        });

        this.form.get('dataHoraAbertura').valueChanges.subscribe(value => {
            if (value) {
                const date = value._i.year  + '-' + value._i.month + '-' + value._i.date;
                this.filters = {
                    ...this.filters,
                    dataHoraAbertura: `lt:${date}`
                };
            } else {
                if (this.filters.hasOwnProperty('dataHoraAbertura')) {
                }
            }
        });

        this.form.get('dataHoraProximaTransicao').valueChanges.subscribe(value => {
            if (value) {
                const date = value._i.year  + '-' + value._i.month + '-' + value._i.date;
                this.filters = {
                    ...this.filters,
                    dataHoraProximaTransicao: `lt:${date}`
                };
            } else {
                if (this.filters.hasOwnProperty('dataHoraProximaTransicao')) {
                }
            }
        });

        this.form.get('etiqueta').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'vinculacoesEtiquetas.etiqueta.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('vinculacoesEtiquetas.etiqueta.id')) {
                    delete this.filters['vinculacoesEtiquetas.etiqueta.id'];
                }
            }
        });
    }

    pesquisar(): void {
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-processo-list-filter').toggleOpen();
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-processo-list-filter').toggleOpen();
        this.form.reset();
    }
}
