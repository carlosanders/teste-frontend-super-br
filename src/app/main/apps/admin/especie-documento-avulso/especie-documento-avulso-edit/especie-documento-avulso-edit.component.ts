import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {EspecieDocumentoAvulso, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState, Back} from 'app/store';
import {CdkUtils} from '@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'especie-documento-avulso-edit',
    templateUrl: './especie-documento-avulso-edit.component.html',
    styleUrls: ['./especie-documento-avulso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieDocumentoAvulsoEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    especieDocumentoAvulso: EspecieDocumentoAvulso;
    especieDocumentoAvulso$: Observable<EspecieDocumentoAvulso>;
    formEspecieDocumentoAvulso: FormGroup;
    workflowPagination: Pagination;
    especieProcessoPagination: Pagination;
    especieTarefaPagination: Pagination;
    generoDocumentoAvulsoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.EspecieDocumentoAvulsoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieDocumentoAvulso$ = this._store.pipe(select(fromStore.getEspecieDocumentoAvulso));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.especieProcessoPagination = new Pagination();
        this.especieProcessoPagination.populate = ['populateAll'];
        this.especieTarefaPagination = new Pagination();
        this.generoDocumentoAvulsoPagination = new Pagination();
        this.workflowPagination = new Pagination();
        this.workflowPagination.populate = ['populateAll'];
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formEspecieDocumentoAvulso = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoDocumentoAvulso: [null, [Validators.required]],
            tarefaInicial: [null, [Validators.required]],
            especieTarefa: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
            workflow: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const especieDocumentoAvulso = new EspecieDocumentoAvulso();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieDocumentoAvulso[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEspecieDocumentoAvulso({
            especieDocumentoAvulso: especieDocumentoAvulso,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
