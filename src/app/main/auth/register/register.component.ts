import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

import * as fromStore from './store';
import {Usuario} from '@cdk/models';
import {MustMatch} from "./must-match.validator";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    isSaving: boolean;
    errors: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    isRegistred$: Observable<boolean>;

    /**
     * @param cdkConfigService
     * @param formBuilder
     * @param _store
     * @param _changeDetectorRef
     */
    constructor(
        public cdkConfigService: CdkConfigService,
        private formBuilder: FormBuilder,
        private _store: Store<fromStore.RegisterAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {

        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required]],
            username: [null, [Validators.required]],
            plainPassword: [null, Validators.required],
            confirmPassword: [null, Validators.required],
        }, {
            validator: MustMatch('plainPassword', 'confirmPassword')
        });

        // Configure the layout
        this.cdkConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.isRegistred$ = this._store.pipe(select(fromStore.getIsRegistred));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.isSaving$.subscribe((isSaving) => {
            this.isSaving = isSaving;
        });

        this.errors$.subscribe((errors) => {
            this.errors = errors;

            if (this.errors && this.errors.status && this.errors.status === 422) {
                try {
                    const data = JSON.parse(this.errors.error.message);
                    const fields = Object.keys(data || {});
                    fields.forEach((field) => {
                        const control = this.form.get(field);
                        control.setErrors({formError: data[field].join(' - ')});
                    });
                } catch (e) {
                    console.log (e);
                    this.form.setErrors({rulesError: this.errors.error.message});
                }
            }

            this._changeDetectorRef.markForCheck();
        });
    }

    onSubmit(): void {
        const usuario = new Usuario();

        usuario.nome = this.form.controls.nome.value;
        usuario.email = this.form.controls.email.value;
        usuario.username = this.form.controls.username.value.replace(/\D/g,'');
        usuario.plainPassword = this.form.controls.plainPassword.value;

        this._store.dispatch(new fromStore.Register(usuario));
    }
}
