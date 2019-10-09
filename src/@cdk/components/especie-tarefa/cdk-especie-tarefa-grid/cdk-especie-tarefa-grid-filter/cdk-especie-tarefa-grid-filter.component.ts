import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-especie-tarefa-grid-filter',
    templateUrl: './cdk-especie-tarefa-grid-filter.component.html',
    styleUrls: ['./cdk-especie-tarefa-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieTarefaGridFilterComponent implements OnInit {

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
            nome: [null],
            generoTarefa: [null]
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
            this.filters = {
                ...this.filters,
                nome: `like:${value}%`
            };
            this.selected.emit(this.filters);
        });

        this.form.get('generoTarefa').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.filters = {
                    ...this.filters,
                    'generoTarefa.id': `eq:${value.id}`
                };
                this.selected.emit(this.filters);
            } else {
                if (this.filters.hasOwnProperty('generoTarefa.id')) {
                    delete this.filters['generoTarefa.id'];
                }
            }
            if (!value) {
                this.selected.emit(this.filters);
            }
        });
    }

}
