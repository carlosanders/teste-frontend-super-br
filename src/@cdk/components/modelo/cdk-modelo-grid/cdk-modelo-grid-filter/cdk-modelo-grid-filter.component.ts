import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'cdk-modelo-grid-filter',
    templateUrl: './cdk-modelo-grid-filter.component.html',
    styleUrls: ['./cdk-modelo-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModeloGridFilterComponent implements OnInit {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            nome: [null],
            conteudo: [null]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('nome').valueChanges.pipe(filter(value => !!value)).subscribe(value => {
            this.selected.emit({nome: `like:${value}%`});
        });

        this.form.get('conteudo').valueChanges.pipe(filter(value => !!value)).subscribe(value => {
            this.selected.emit({'documento.componentesDigitais.conteudo': value});
        });
    }

}
