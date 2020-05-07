import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CdkConfigService } from '@cdk/services/config.service';
import { cdkAnimations } from '@cdk/animations';

import * as fromStore from '../register/store';
import { getRegisterAppState } from '../register/store';
import {Usuario} from '@cdk/models';

@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    getRegisterState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;

    /**
     * Constructor
     *
     * @param cdkConfigService
     * @param formBuilder
     * @param store
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private formBuilder: FormBuilder,
        private store: Store<fromStore.RegisterState>
    )
    {
        // Configure the layout
        this.cdkConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.getRegisterState = this.store.pipe(select(getRegisterAppState));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loading = false;

        this.registerForm = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required]
        });

        this.getRegisterState.subscribe((state) => {
            this.loading = false;
            this.errorMessage = state.register.errorMessage;
        });
    }

    onSubmit(): void {

        const usuario = new Usuario();

        usuario.nome = this.registerForm.controls.nome.value;
        usuario.email = this.registerForm.controls.email.value;
        usuario.username = this.registerForm.controls.username.value;
        usuario.password = this.registerForm.controls.password.value;

        this.loading = true;
        this.store.dispatch(new fromStore.Register(usuario));
    }
}
