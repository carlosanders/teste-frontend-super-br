import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cdk-relevancia-form',
    templateUrl: './cdk-relevancia-form.component.html',
    styleUrls: ['./cdk-relevancia-form.component.scss']
})
export class CdkRelevanciaFormComponent {

    form: FormGroup;
    activeCard = 'form';

    constructor(private _formBuilder: FormBuilder) {
        this.form = this._formBuilder.group({

        });

    }

}