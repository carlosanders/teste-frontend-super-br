import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/auth/esqueci-senha/store';
import {getEsqueciSenhaAppState} from 'app/main/auth/esqueci-senha/store';
import {Back} from 'app/store/actions';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector     : 'esqueci-senha',
    templateUrl  : './esqueci-senha.component.html',
    styleUrls    : ['./esqueci-senha.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class EsqueciSenhaComponent implements OnInit, OnDestroy {

    esqueciSenhaForm: FormGroup;
    getEsqueciSenhaState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     *
     * @param cdkConfigService
     * @param formBuilder
     * @param store
     */
    constructor(
        public cdkConfigService: CdkConfigService,
        private formBuilder: FormBuilder,
        private store: Store<fromStore.EsqueciSenhaState>
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

        this.getEsqueciSenhaState = this.store.pipe(select(getEsqueciSenhaAppState));
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

        this.esqueciSenhaForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        });

        this.getEsqueciSenhaState.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((state) => {
            this.loading = false;
            this.errorMessage = state.esqueciSenha.errorMessage;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        const payload = {
            username: this.esqueciSenhaForm.controls.username.value,
            email: this.esqueciSenhaForm.controls.email.value
        };
        this.loading = true;
        this.store.dispatch(new fromStore.EsqueciSenha(payload));
    }

    onBack(): void {
        this.store.dispatch(new fromStore.Unload());
        this.store.dispatch(new Back());
    }
}
