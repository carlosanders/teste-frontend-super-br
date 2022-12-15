import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Criteria, Etiqueta, Pagination, RegraEtiqueta, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../../store';
import {Back} from 'app/store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../../store';
import {CdkUtils} from '../../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

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
    assuntoAdministrativoPagination: Pagination;

    _profile: Usuario;

    especieCriteriaList: Criteria[] = [];

    criteriasTemplate: any[] = [
        {
            id: 1,
            descricao: 'Observação contém:',
            mapeamento: '{\'observacao\':\'like:%{placeholder}%\'}'
        },
        {
            id: 2,
            descricao: 'Recebido de setor:',
            mapeamento: '{\'setorOrigem.id\':\'eq:{placeholder}\'}'
        },
        {
            id: 3,
            descricao: 'Recebido de unidade:',
            mapeamento: '{\'setorOrigem.unidade.id\':\'eq:{placeholder}\'}'
        },
        {
            id: 4,
            descricao: 'Recebido de usuário:',
            mapeamento: '{\'criadoPor.id\':\'eq:{placeholder}\'}'
        },
        {
            id: 5,
            descricao: 'Assunto do Processo:',
            mapeamento: '{\'processo.assuntos.assuntoAdministrativo.id\':\'eq:{placeholder}\'}'
        },
    ];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
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
            const newCriteria = new Criteria();
            newCriteria.id = criteria.id;
            newCriteria.descricao = criteria.descricao;
            newCriteria.mapeamento = criteria.mapeamento;
            this.especieCriteriaList.push(newCriteria);
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.assuntoAdministrativoPagination = new Pagination();
        this.assuntoAdministrativoPagination.populate = ['parent'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.etiqueta$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(etiqueta => this.etiqueta = etiqueta);

        this.regraEtiqueta$.pipe(
            filter(regraEtiqueta => !!regraEtiqueta),
            takeUntil(this._unsubscribeAll)
        ).subscribe(regraEtiqueta => this.regraEtiqueta = regraEtiqueta);

        if (!this.regraEtiqueta) {
            this.regraEtiqueta = new RegraEtiqueta();
            this.regraEtiqueta.etiqueta = this.etiqueta;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const regraEtiqueta = new RegraEtiqueta();

        const criterias: string[] = [];
        values.criterias.forEach((aCriteria: Criteria) => {
            const eachCriteria = aCriteria.mapeamento.replace('{placeholder}', aCriteria.valor);
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRegraEtiqueta({
            regraEtiqueta: regraEtiqueta,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
