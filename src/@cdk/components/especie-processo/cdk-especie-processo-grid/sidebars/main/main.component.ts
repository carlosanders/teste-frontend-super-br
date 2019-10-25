import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@angular/material';

@Component({
    selector   : 'cdk-especie-processo-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss'],
    animations   : fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkEspecieProcessoListMainSidebarComponent implements OnInit
{
    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    gridFilter: any;

    /**
     * Constructor
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            nome: [null],
            descricao: [null],
            ativo: [null],
            generoProcesso: [null],
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
        this.form.get('nome').valueChanges.subscribe(value => {
            if (value) {
                this.filters = {
                    ...this.filters,
                    nome: `like:${value}%`
                };
                this.selected.emit(this.filters); // Devo retirar?
            }
        });

        this.form.get('descricao').valueChanges.subscribe(value => {
            if (value) {
                this.filters = {
                    ...this.filters,
                    descricao: `like:${value}%`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('ativo').valueChanges.subscribe(value => {
            if (value !== null) {
                this.filters = {
                    ...this.filters,
                    ativo: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('generoProcesso').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'generoProcesso.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('generoProcesso.id')) {
                    delete this.filters['generoProcesso.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('criadoEm').valueChanges.subscribe(value => {
            if (value) {
                this.filters = {
                    ...this.filters,
                    criadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            if (value) {
                this.filters = {
                    ...this.filters,
                    atualizadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            if (value) {
                this.filters = {
                    ...this.filters,
                    apagadoEm: `eq:${value}`
                };
                this.selected.emit(this.filters);
            }
        });

        this.form.get('criadoPor').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'criadoPor.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('criadoPor.id')) {
                    delete this.filters['criadoPor.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('atualizadoPor').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'atualizadoPor.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('atualizadoPor.id')) {
                    delete this.filters['atualizadoPor.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('apagadoPor').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'apagadoPor.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('apagadoPor.id')) {
                    delete this.filters['apagadoPor.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });
    }

    pesquisar(): void {
        this.selected.emit(this.filters);
        this._fuseSidebarService.getSidebar('cdk-especie-processo-main-sidebar').toggleOpen();
    }

    limpar(): void {
        this.filters = {};
        this.selected.emit(this.filters);
        this._fuseSidebarService.getSidebar('cdk-especie-processo-main-sidebar').toggleOpen();
        this.form.reset();
    }


}
