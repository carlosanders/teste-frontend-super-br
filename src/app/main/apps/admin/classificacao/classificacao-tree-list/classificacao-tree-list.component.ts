import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Classificacao, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getRouterState} from '../../../../../store';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'classificacao-tree-list',
    templateUrl: './classificacao-tree-list.component.html',
    styleUrls: ['./classificacao-tree-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ClassificacaoTreeListComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    classificacao$: Observable<Classificacao[]>;
    classificacaoPagination: Pagination;
    formClassificacao: FormGroup;

    constructor(
        private _store: Store<fromStore.ClassificacaoTreeListAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.classificacao$ = this._store.pipe(select(fromStore.getClassificacaoTreeList));
        this.classificacaoPagination = new Pagination();
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngOnInit(): void {
    }

    submitClassificacao(values: any): void {
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
        this._router.navigate(['/apps/admin/assuntos/arvore']).then();
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
            observacao: [null, [Validators.maxLength(255)]]
        });
    }
}
