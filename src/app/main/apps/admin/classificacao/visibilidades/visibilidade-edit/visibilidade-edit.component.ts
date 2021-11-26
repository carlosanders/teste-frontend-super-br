import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Classificacao, Pagination, Usuario, Visibilidade} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from 'app/store';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'classificacao-visibilidade-edit',
    templateUrl: './visibilidade-edit.component.html',
    styleUrls: ['./visibilidade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadeEditComponent implements OnInit, OnDestroy {

    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;
    routerState: any;
    _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     */
    constructor(private _store: Store<fromStore.ClassificacaoVisibilidadeEditAppState>,
                private _loginService: LoginService) {
        this.isSaving$ = this._store.pipe(select(fromStore.getClassificacaoVisibilidadeIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getClassificacaoVisibilidadeErrors));
        this.visibilidade$ = this._store.pipe(select(fromStore.getClassificacaoVisibilidade));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.visibilidade$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(visibilidade => !!visibilidade)
        ).subscribe(visibilidade => this.visibilidade = visibilidade);

        if (!this.visibilidade) {
            this.visibilidade = new Visibilidade();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(visibilidade): void
    {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVisibilidade({
            classificacaoId: this.routerState.params['classificacaoHandle'],
            visibilidade: visibilidade,
            operacaoId: operacaoId
        }));
    }

    abort(): void
    {
        this._store.dispatch(new Back());
    }

}
