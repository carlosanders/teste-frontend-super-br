import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {AssuntoAdministrativo, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {FormBuilder} from '@angular/forms';
import {getRouterState} from '../../../../../store';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'assunto-administrativo-tree-list',
    templateUrl: './assunto-administrativo-tree-list.component.html',
    styleUrls: ['./assunto-administrativo-tree-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AssuntoAdministrativoTreeListComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    assuntoAdministrativo$: Observable<AssuntoAdministrativo[]>;
    assuntoAdministrativoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.AssuntoAdministrativoTreeListAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.assuntoAdministrativo$ = this._store.pipe(select(fromStore.getAssuntoAdministrativoTreeList));
        this.assuntoAdministrativoPagination = new Pagination();
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngOnInit(): void {
    }

    submitAssuntoAdministrativo(values: any): void {
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
        this._router.navigate(['/apps/admin/assuntos/arvore']).then();
    }
}
