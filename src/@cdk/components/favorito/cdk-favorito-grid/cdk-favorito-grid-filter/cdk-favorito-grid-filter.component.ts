import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-favorito-grid-filter',
    templateUrl: './cdk-favorito-grid-filter.component.html',
    styleUrls: ['./cdk-favorito-grid-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkFavoritoGridFilterComponent implements OnInit {

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
            'setor.nome': [null]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('setor.nome').valueChanges.subscribe(value => {
            this.selected.emit({'setor.nome': `like:${value}%`});
        });
    }

}
