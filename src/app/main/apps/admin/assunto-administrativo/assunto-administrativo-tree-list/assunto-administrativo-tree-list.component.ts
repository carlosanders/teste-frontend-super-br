import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AssuntoAdministrativo, Pagination} from '../../../../../../@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {FormBuilder} from '@angular/forms';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'app-assunto-administrativo-tree-list',
    templateUrl: './assunto-administrativo-tree-list.component.html',
    styleUrls: ['./assunto-administrativo-tree-list.component.scss']
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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.assuntoAdministrativo$ = this._store.pipe(select(fromStore.getAssuntoAdministrativoTreeList));
        this.assuntoAdministrativoPagination = new Pagination();
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngOnInit(): void {
    }

    submitAssuntoAdministrativo(values: any) {
        const assuntoAdministrativo = new AssuntoAdministrativo();
        Object.entries(values).forEach(
            ([key, value]) => {
                assuntoAdministrativo[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveAssuntoAdministrativo(assuntoAdministrativo));
    }

    doAbort() {
        this._router.navigate(['/apps/admin/assuntos/arvore']).then();
    }
}
