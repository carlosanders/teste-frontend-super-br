import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {RegraEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Etiqueta} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../../store/selectors';
import {Criteria, Usuario} from '@cdk/models';
import {Back} from 'app/store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../../store/reducers';

@Component({
    selector: 'regra-etiqueta-edit',
    templateUrl: './regra-etiqueta-edit.component.html',
    styleUrls: ['./regra-etiqueta-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RegraEtiquetaEditComponent implements OnInit, OnDestroy {
    routerState: any;
    regraEtiqueta$: Observable<RegraEtiqueta>;
    regraEtiqueta: RegraEtiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Usuario;

    especieCriteriaList: Criteria[] = [];

    criteriasTemplate: any[] = [
        {
            id: 1,
            descricao: 'Observação contém:',
            mapeamento: "{'observacao':'like:%{placeholder}%'}"
        },
        {
            id: 2,
            descricao: 'Recebido de setor:',
            mapeamento: "{'setorResponsavel.id':'eq:{placeholder}'}"
        },
        {
            id: 3,
            descricao: 'Recebido de unidade:',
            mapeamento: "{'unidadeResponsavel.id':'eq:{placeholder}'}"
        },
        {
            id: 4,
            descricao: 'Recebido de usuário:',
            mapeamento: "{'usuarioResponsavel.id':'eq:{placeholder}'}"
        },
    ];

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RegraEtiquetaEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.regraEtiqueta$ = this._store.pipe(select(fromStore.getRegraEtiqueta));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};

        this.criteriasTemplate.forEach((criteria) => {
            let newCriteria = new Criteria();
            newCriteria.id = criteria.id;
            newCriteria.descricao = criteria.descricao;
            newCriteria.mapeamento = criteria.mapeamento;
            this.especieCriteriaList.push(newCriteria);
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
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

        this.regraEtiqueta$.subscribe(
            regraEtiqueta => this.regraEtiqueta = regraEtiqueta
        );

        if (!this.regraEtiqueta) {
            this.regraEtiqueta = new RegraEtiqueta();
            this.regraEtiqueta.etiqueta = this.etiqueta;
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
        const regraEtiqueta = new RegraEtiqueta();

        let criterias: string[] = [];
        values.criterias.forEach((criteria: Criteria) => {
            const eachCriteria = criteria.mapeamento.replace('{placeholder}', criteria.valor);
            criterias.push(eachCriteria);
        });

        const criteria = criterias.join(',');
        delete values.criterias;

        Object.entries(values).forEach(
            ([key, value]) => {
                regraEtiqueta[key] = value;
            }
        );

        regraEtiqueta.criteria = criteria;
        regraEtiqueta.etiqueta = this.etiqueta;

        this._store.dispatch(new fromStore.SaveRegraEtiqueta(regraEtiqueta));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}