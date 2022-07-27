import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Cronjob, Pagination} from '@cdk/models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import * as appStore from 'app/store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'cronjob-edit',
    templateUrl: './cronjob-edit.component.html',
    styleUrls: ['./cronjob-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CronjobEditComponent implements OnInit, OnDestroy {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    cronjob: Cronjob;
    cronjob$: Observable<Cronjob>;
    formCronjob: FormGroup;
    logEntryPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.CronjobEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.cronjob$ = this._store.pipe(select(fromStore.getCronjob));

        this._store.pipe(
            select(appStore.getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.logEntryPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
        this.cronjob$.pipe(
            filter(cronjob => !!cronjob),
            takeUntil(this._unsubscribeAll)
        ).subscribe((cronjob) => {
            this.cronjob = cronjob;
            this.logEntryPagination.filter = {
                entity: 'SuppCore\\AdministrativoBackend\\Entity\\Cronjob',
                id: +this.cronjob.id
            };
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    loadForm(): void {
        this.formCronjob = this._formBuilder.group({
            id: new FormControl<number|null>(null),
            nome: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            descricao: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            periodicidade: new FormControl<string|null>('* * * * *', [Validators.maxLength(255), Validators.minLength(9)]),
            comando: new FormControl<string|null>(null, [Validators.maxLength(255), Validators.minLength(3)]),
            ativo: new FormControl<boolean>(true),
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitCronjob(values): void {
        const cronjob = new Cronjob();
        Object.entries(values).forEach(
            ([key, value]) => {
                cronjob[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveCronjob({
            cronjob: cronjob,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new appStore.Back());
    }

}
