import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Classificacao, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store';
import {Back} from '../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'classificacao-edit',
    templateUrl: './classificacao-edit.component.html',
    styleUrls: ['./classificacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ClassificacaoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    classificacao: Classificacao;
    classificacao$: Observable<Classificacao>;
    formClassificacao: FormGroup;
    classificacaoPagination: Pagination;
    logEntryPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.ClassificacaoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.classificacao$ = this._store.pipe(select(fromStore.getClassificacao));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.classificacaoPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
        this.classificacao$.pipe(
            filter(classificacao => !!classificacao),
            takeUntil(this._unsubscribeAll)
        ).subscribe((classificacao) => {
            this.classificacao = classificacao;
            this.logEntryPagination.filter = {
                entity: 'SuppCore\\AdministrativoBackend\\Entity\\Classificacao',
                id: +this.classificacao.id
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
        this.formClassificacao = this._formBuilder.group({
            id: [null],
            codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeDestinacao: [null, [Validators.required]],
            parent: [null],
            ativo: [null],
            permissaoUso: [null],
            prazoGuardaFaseCorrenteDia: [null],
            prazoGuardaFaseCorrenteMes: [null],
            prazoGuardaFaseCorrenteAno: [null],
            prazoGuardaFaseCorrenteEvento: [null],
            prazoGuardaFaseIntermediariaDia: [null],
            prazoGuardaFaseIntermediariaMes: [null],
            prazoGuardaFaseIntermediariaAno: [null],
            prazoGuardaFaseIntermediariaEvento: [null],
            observacao: [null, [Validators.maxLength(255)]],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitClassificacao(values): void {
        const classificacao = new Classificacao();
        Object.entries(values).forEach(
            ([key, value]) => {
                classificacao[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveClassificacao({
            classificacao: classificacao,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
