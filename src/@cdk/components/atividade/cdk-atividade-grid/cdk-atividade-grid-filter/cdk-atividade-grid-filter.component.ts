import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-atividade-grid-filter',
    templateUrl: './cdk-atividade-grid-filter.component.html',
    styleUrls: ['./cdk-atividade-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAtividadeGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    filters: any = {};

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            dataHoraConclusao: [null],
            observacao: [null],
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            especieAtividade: [null],
            setor: [null],
            usuario: [null],
            usuarioAprovacao: [null],
            setorAprovacao: [null],
            tarefa: [null],
            documentos: [null],
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
        this.form.get('observacao').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                observacao: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('destinacaoMinutas').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                destinacaoMinutas: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('encerraTarefa').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                encerraTarefa: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('dataHoraConclusao').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                dataHoraConclusao: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('especieAtividade').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'especieAtividade.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('especieAtividade.id')) {
                    delete this.filters['especieAtividade.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('setor').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'setor.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('setor.id')) {
                    delete this.filters['setor.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('usuario').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'usuario.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('usuario.id')) {
                    delete this.filters['usuario.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('usuarioAprovacao').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'usuarioAprovacao.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('usuarioAprovacao.id')) {
                    delete this.filters['usuarioAprovacao.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('setorAprovacao').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'setorAprovacao.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('setorAprovacao.id')) {
                    delete this.filters['setorAprovacao.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('tarefa').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'tarefa.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('tarefa.id')) {
                    delete this.filters['tarefa.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('documentos').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'documentos.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('documentos.id')) {
                    delete this.filters['documentos.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });



        this.form.get('criadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                criadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('atualizadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                atualizadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('apagadoEm').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                apagadoEm: `eq:${value}`
            };
            this.selected.emit(this.filters);
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

}
