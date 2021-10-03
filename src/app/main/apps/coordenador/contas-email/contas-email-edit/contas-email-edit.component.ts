import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ContaEmail, Pagination, Setor} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';

@Component({
    selector: 'contas-email-edit',
    templateUrl: './contas-email-edit.component.html',
    styleUrls: ['./contas-email-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ContasEmailEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    contaEmail: ContaEmail;
    estadoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.ContaEmailEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._store.pipe(select(fromStore.getContaEmail))
            .subscribe(ContaEmail => this.contaEmail = ContaEmail);

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.estadoPagination = new Pagination();
    }

    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitContaEmail(values): void {
        const contaEmail = new ContaEmail();
        Object.entries(values).forEach(
            ([key, value]) => {
                contaEmail[key] = value;
            }
        );

        const setor = new Setor();
        setor.id = this.routerState.params['entidadeHandle'];
        contaEmail.setor = setor;

        this._store.dispatch(new fromStore.SaveContaEmail({
            contaEmail: contaEmail
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
