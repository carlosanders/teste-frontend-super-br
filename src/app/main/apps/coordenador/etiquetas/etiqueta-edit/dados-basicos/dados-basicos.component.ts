import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Etiqueta, ModalidadeOrgaoCentral, Pagination, Setor, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../store';
import {Back, getRouterState} from '../../../../../../store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    routerState: any;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    setor$: Observable<Setor>;
    setorHandle$: Observable<Setor>;
    setor: Setor = null;
    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral = null;
    unidade$: Observable<Setor>;
    unidadeHandle$: Observable<Setor>;
    unidade: Setor = null;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    templatePagination: Pagination;

    modalidadeEtiquetaPagination: Pagination;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.EtiquetaEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.modalidadeOrgaoCentral$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentral));

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.params['unidadeHandle']) {
                this.unidadeHandle$ = this._store.pipe(select(fromStore.getUnidadeHandle));

                this.unidadeHandle$.pipe(
                    takeUntil(this._unsubscribeAll),
                    filter(setor => !!setor)
                ).subscribe((setor) => {
                    this.unidade = setor;
                });
            }
            if (this.routerState.params['setorHandle']) {
                this.setorHandle$ = this._store.pipe(select(fromStore.getSetorHandle));

                this.setorHandle$.pipe(
                    filter(setor => !!setor),
                    takeUntil(this._unsubscribeAll)
                ).subscribe((setor) => {
                    this.setor = setor;
                });
            }
        });

        this.modalidadeEtiquetaPagination = new Pagination();
        this.modalidadeEtiquetaPagination.populate = ['populateAll'];
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

        this.setor$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(setor => !!setor)
        ).subscribe((setor) => {
            this.setor = setor;
        });

        this.unidade$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(setor => !!setor)
        ).subscribe((setor) => {
            this.unidade = setor;
        });

        this.modalidadeOrgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(modalidadeOrgaoCentral => !!modalidadeOrgaoCentral)
        ).subscribe((modalidadeOrgaoCentral) => {
            this.modalidadeOrgaoCentral = modalidadeOrgaoCentral;
        });

        if (!this.etiqueta) {
            this.etiqueta = new Etiqueta();
            this.etiqueta.ativo = true;
            this.etiqueta.corHexadecimal = '#D9E3F0';

            if (this.setor) {
                this.etiqueta.setor = this.setor;
            } else if (this.unidade) {
                this.etiqueta.unidade = this.unidade;
            } else {
                this.etiqueta.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
            }
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
        const etiqueta = new Etiqueta();

        Object.entries(values).forEach(
            ([key, value]) => {
                etiqueta[key] = value;
            }
        );

        if (this.etiqueta.modalidadeEtiqueta) {
            etiqueta.modalidadeEtiqueta = this.etiqueta.modalidadeEtiqueta;
        }

        if (this.setor) {
            etiqueta.setor = this.setor;
        } else if (this.unidade) {
            etiqueta.unidade = this.unidade;
        } else {
            etiqueta.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEtiqueta({
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
