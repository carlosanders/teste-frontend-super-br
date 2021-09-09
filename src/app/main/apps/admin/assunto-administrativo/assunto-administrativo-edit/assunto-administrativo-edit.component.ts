import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {AssuntoAdministrativo, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'assunto-administrativo-edit',
    templateUrl: './assunto-administrativo-edit.component.html',
    styleUrls: ['./assunto-administrativo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AssuntoAdministrativoEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    assuntoAdministrativo: AssuntoAdministrativo;
    assuntoAdministrativo$: Observable<AssuntoAdministrativo>;
    formAssuntoAdministrativo: FormGroup;
    assuntoAdministrativoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.AssuntoAdministrativoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.assuntoAdministrativo$ = this._store.pipe(select(fromStore.getAssuntoAdministrativo));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.assuntoAdministrativoPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formAssuntoAdministrativo = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            parent: [null],
            dispositivoLegal: [null],
            codigoCNJ: [null],
            glossario: [null],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitAssuntoAdministrativo(values): void {
        const assuntoAdministrativo = new AssuntoAdministrativo();
        Object.entries(values).forEach(
            ([key, value]) => {
                assuntoAdministrativo[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAssuntoAdministrativo({
            assuntoAdministrativo: assuntoAdministrativo,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
