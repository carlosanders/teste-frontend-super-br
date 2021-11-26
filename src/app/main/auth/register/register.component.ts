import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

import * as fromStore from './store';
import {Usuario} from '@cdk/models';
import {MustMatch} from './must-match.validator';
import {CdkUtils} from '../../../../@cdk/utils';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {

    form: FormGroup;
    isSaving: boolean;
    errors: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    isRegistred$: Observable<boolean>;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param cdkConfigService
     * @param _formBuilder
     * @param _store
     * @param _changeDetectorRef
     */
    constructor(
        public cdkConfigService: CdkConfigService,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.RegisterAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.form = this._formBuilder.group({
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
        this.isSaving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((isSaving) => {
            this.isSaving = isSaving;
        });

        this.errors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
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
                    console.log(e);
                    this.form.setErrors({rulesError: this.errors.error.message});
                }
            }

            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        const usuario = new Usuario();

        usuario.nome = this.form.controls.nome.value;
        usuario.email = this.form.controls.email.value;
        usuario.username = this.form.controls.username.value.replace(/\D/g, '');
        usuario.plainPassword = this.form.controls.plainPassword.value;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.Register({
            usuario: usuario,
            operacaoId: operacaoId
        }));
    }
}
