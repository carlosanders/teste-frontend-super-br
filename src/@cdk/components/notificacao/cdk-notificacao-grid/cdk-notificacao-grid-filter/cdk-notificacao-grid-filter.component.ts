import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-notificacao-grid-filter',
    templateUrl: './cdk-notificacao-grid-filter.component.html',
    styleUrls: ['./cdk-notificacao-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkNotificacaoGridFilterComponent implements OnInit {

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
            remetente: [null],
            destinatario: [null],
            modalidadeNotificacao: [null],
            dataHoraExpiracao: [null],
            dataHoraLeitura: [null],
            conteudo: [null],
            urgente: [null],
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
        this.form.get('conteudo').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                conteudo: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('urgente').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                urgente: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('dataHoraExpiracao').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                dataHoraExpiracao: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('dataHoraLeitura').valueChanges.subscribe(value => {
            this.filters = {
                ...this.filters,
                dataHoraLeitura: `eq:${value}`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('remetente').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'remetente.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('remetente.id')) {
                    delete this.filters['remetente.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('destinatario').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'destinatario.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('destinatario.id')) {
                    delete this.filters['destinatario.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });

        this.form.get('modalidadeNotificacao').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'modalidadeNotificacao.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('modalidadeNotificacao.id')) {
                    delete this.filters['modalidadeNotificacao.id'];
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

