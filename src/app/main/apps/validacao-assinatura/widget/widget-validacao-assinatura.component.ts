import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'widget-validacao-assinatura',
    templateUrl: './widget-validacao-assinatura.component.html',
    styleUrls: ['./widget-validacao-assinatura.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetValidacaoAssinaturaComponent implements OnInit {

    form: FormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
        this.form = this._formBuilder.group({
            id: [null, [Validators.required]],
            chaveAcesso: [null, [Validators.required]]
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    doSubmit(): void {
        if (this.form.valid) {
            this._router.navigate([`apps/validacao-assinatura/${this.form.get('id').value}/${this.form.get('chaveAcesso').value}`]).then();
        }
    }
}
