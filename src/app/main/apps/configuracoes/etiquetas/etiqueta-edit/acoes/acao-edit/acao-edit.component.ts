import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {Acao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Etiqueta} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../../store/selectors';
import {Usuario} from '../../../../../../../../@cdk/models';
import {Back} from '../../../../../../../store/actions';

@Component({
    selector: 'acao-edit',
    templateUrl: './acao-edit.component.html',
    styleUrls: ['./acao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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

    _profile: Usuario;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AcaoEditAppState>,
        public _loginService: LoginService
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
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};
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
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0001':
                values.contexto = JSON.stringify({modeloId: values.modelo.id});
                delete values.modelo;
                break;
            case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\VinculacaoEtiqueta\\Trigger0002':
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
