import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {EspecieProcesso, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from 'app/store';
import {CdkUtils} from '@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'especie-processo-edit',
    templateUrl: './especie-processo-edit.component.html',
    styleUrls: ['./especie-processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieProcessoEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    especieProcesso: EspecieProcesso;
    especieProcesso$: Observable<EspecieProcesso>;
    formEspecieProcesso: FormGroup;
    generoProcessoPagination: Pagination;
    classificacaoProcessoPagination: Pagination;
    modalidadeMeioPagination: Pagination;

    constructor(
        private _store: Store<fromStore.EspecieProcessoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieProcesso$ = this._store.pipe(select(fromStore.getEspecieProcesso));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.generoProcessoPagination = new Pagination();
        this.classificacaoProcessoPagination = new Pagination();
        this.modalidadeMeioPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formEspecieProcesso = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoProcesso: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            classificacao: [null],
            modalidadeMeio: [null],
            titulo: [null],
            ativo: [null],
            evento: [null]
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitEspecieProcesso(values): void {

        const especieProcesso = new EspecieProcesso();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieProcesso[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEspecieProcesso({
            especieProcesso: especieProcesso,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
