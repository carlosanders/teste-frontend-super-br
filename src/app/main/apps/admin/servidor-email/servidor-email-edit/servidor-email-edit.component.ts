import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {ServidorEmail, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';

@Component({
    selector: 'servidor-email-edit',
    templateUrl: './servidor-email-edit.component.html',
    styleUrls: ['./servidor-email-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ServidorEmailEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    servidorEmail: ServidorEmail;
    estadoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.ServidorEmailEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._store.pipe(select(fromStore.getServidorEmail))
            .subscribe(servidorEmail => this.servidorEmail = servidorEmail);

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

    submitServidorEmail(values): void {
        const servidorEmail = new ServidorEmail();
        Object.entries(values).forEach(
            ([key, value]) => {
                servidorEmail[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveServidorEmail({
            servidorEmail: servidorEmail
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
