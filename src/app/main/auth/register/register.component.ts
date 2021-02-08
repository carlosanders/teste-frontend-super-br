import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

import * as fromStore from './store';
import {getRegisterAppState} from './store';
import {Usuario} from '@cdk/models';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegisterComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject();

    registerForm: FormGroup;
    getRegisterState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;
    isRegistred$: Observable<boolean>;
    isRegistred: boolean;

    /**
     * Constructor
     *
     * @param cdkConfigService
     * @param formBuilder
     * @param _store
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private formBuilder: FormBuilder,
        private _store: Store<fromStore.RegisterAppState>
    ) {

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

        this.getRegisterState = this._store.pipe(select(getRegisterAppState));
        this.isRegistred$ = this._store.pipe(select(fromStore.getIsRegistred));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loading = false;

        this.registerForm = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required]],
            username: [null, [Validators.required]],
            plainPassword: [null, Validators.required],
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
        usuario.username = this.registerForm.controls.username.value.replace(/\D/g,'');
        usuario.plainPassword = this.registerForm.controls.plainPassword.value;

        this.loading = true;
        this._store.dispatch(new fromStore.Register(usuario));
    }
}
