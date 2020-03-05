import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector   : 'cdk-processo-list-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss'],
    animations   : fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkProcessoListMainSidebarComponent implements OnInit
{
    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            processo: [null],
            especieProcesso: [null],
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
    }

    pesquisar(): void {
        this.selected.emit(this.filters);
        this._fuseSidebarService.getSidebar('cdk-processo-list-main-sidebar').toggleOpen();
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this._fuseSidebarService.getSidebar('cdk-processo-list-main-sidebar').toggleOpen();
        this.form.reset();
    }
}
