import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '../../../../../../@cdk/animations';
import {Observable} from 'rxjs';
import {Pessoa} from '../../../../../../@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'admin-pessoa-edit',
    templateUrl: './admin-pessoa-edit.component.html',
    styleUrls: ['./admin-pessoa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminPessoaEditComponent {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoa: Pessoa;
    pessoa$: Observable<Pessoa>;
    formPessoa: FormGroup;

    constructor(
        private _store: Store<fromStore.PessoaEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoa$ = this._store.pipe(select(fromStore.getPessoa));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.loadForm();
    }

    loadForm(): void {
        this.formPessoa = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            pessoaRepresentada: [null, [Validators.required]],
            pessoaConveniada: [null, [Validators.required]],
            pessoaValidada: [null, [Validators.required]],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitPessoa(values): void {
        const pessoa = new Pessoa();
        Object.entries(values).forEach(
            ([key, value]) => {
                pessoa[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SavePessoa(pessoa));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
