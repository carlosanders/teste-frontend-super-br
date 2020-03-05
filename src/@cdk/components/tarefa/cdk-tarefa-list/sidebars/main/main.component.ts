import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { cdkAnimations } from '@cdk/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector   : 'cdk-tarefa-list-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss'],
    animations   : cdkAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTarefaListMainSidebarComponent implements OnInit
{
    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = '{}';

    /**
     * Constructor
     */
    constructor(
        private _cdkSidebarService: CdkSidebarService,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            processo: [null],
            especieTarefa: [null],
            usuarioResponsavel: [null],
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
                    'processo.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('processo.id')) {
                    delete this.filters['processo.id'];
                }
            }
        });

        this.form.get('especieTarefa').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'especieTarefa.id': `eq:${value.id}`
                };
            } else {
                if (this.filters.hasOwnProperty('especieTarefa.id')) {
                    delete this.filters['especieTarefa.id'];
                }
            }
        });
    }

    pesquisar(): void {
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-tarefa-list-main-sidebar').toggleOpen();
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this._cdkSidebarService.getSidebar('cdk-tarefa-list-main-sidebar').toggleOpen();
        this.form.reset();
    }
}
