import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Acao} from '@cdk/models/acao.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Etiqueta} from '@cdk/models/etiqueta.model';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models/colaborador.model';
import {getEtiqueta} from '../../store/selectors';

@Component({
    selector: 'acao-edit',
    templateUrl: './acao-edit.component.html',
    styleUrls: ['./acao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcaoEditComponent implements OnInit, OnDestroy {

    acao$: Observable<Acao>;
    acao: Acao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Colaborador;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AcaoEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.usuario.id}`};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.etiqueta$.subscribe(
            etiqueta => this.etiqueta = etiqueta
        );

        this.acao$.subscribe(
            acao => this.acao = acao
        );

        if (!this.acao) {
            this.acao = new Acao();
            this.acao.etiqueta = this.etiqueta;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        switch (values.trigger) {
            case 'App\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0001':
                values.contexto = JSON.stringify({modeloId: values.modelo.id});
                delete values.modelo;
                break;
            case 'App\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0002':
                break;

        }

        const acao = new Acao();

        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveAcao(acao));
    }

}
