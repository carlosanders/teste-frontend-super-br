import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {EspecieAtividade, Pagination} from '@cdk/models';
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
    selector: 'especie-atividade-edit',
    templateUrl: './especie-atividade-edit.component.html',
    styleUrls: ['./especie-atividade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieAtividadeEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    especieAtividade: EspecieAtividade;
    especieAtividade$: Observable<EspecieAtividade>;
    formEspecieAtividade: FormGroup;
    generoAtividadePagination: Pagination;

    constructor(
        private _store: Store<fromStore.EspecieAtividadeEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieAtividade$ = this._store.pipe(select(fromStore.getEspecieAtividade));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.generoAtividadePagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formEspecieAtividade = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoAtividade: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitEspecieAtividade(values): void {
        const especieAtividade = new EspecieAtividade();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieAtividade[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEspecieAtividade({
            especieAtividade: especieAtividade,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
