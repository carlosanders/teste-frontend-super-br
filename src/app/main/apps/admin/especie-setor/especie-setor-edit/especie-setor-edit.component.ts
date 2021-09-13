import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {EspecieSetor, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store';
import {Back} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'especie-setor-edit',
    templateUrl: './especie-setor-edit.component.html',
    styleUrls: ['./especie-setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieSetorEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    especieSetor: EspecieSetor;
    especieSetor$: Observable<EspecieSetor>;
    formEspecieSetor: FormGroup;
    generoSetorPagination: Pagination;

    constructor(
        private _store: Store<fromStore.EspecieSetorEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieSetor$ = this._store.pipe(select(fromStore.getEspecieSetor));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.generoSetorPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formEspecieSetor = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoSetor: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null]
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitEspecieSetor(values): void {
        const especieSetor = new EspecieSetor();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieSetor[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEspecieSetor({
            especieSetor: especieSetor,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
