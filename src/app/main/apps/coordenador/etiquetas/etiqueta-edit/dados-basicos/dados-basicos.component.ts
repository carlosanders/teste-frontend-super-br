import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Etiqueta, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../store/selectors';
import {Back} from '../../../../../../store/actions';
import {getRouterState} from '../../../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'coordenador-etiqueta-dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    setor$: Observable<Setor>;
    setorHandle$: Observable<Setor>;
    setor: Setor = null;
    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral = null;
    unidade$: Observable<Setor>;
    unidadeHandle$: Observable<Setor>;
    unidade: Setor = null;

    usuario: Usuario;

    modalidadeEtiquetaPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.CoordenadorEtiquetaEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.params['unidadeHandle']) {
                        this.unidadeHandle$ = this._store.pipe(select(fromStore.getUnidadeHandle));

                        this.unidadeHandle$.pipe(
                            takeUntil(this._unsubscribeAll)
                        ).subscribe(
                            setor => {
                                if (setor) {
                                    this.unidade = setor;
                                }
                            }
                        );
                    }
                    if (this.routerState.params['setorHandle']) {
                        this.setorHandle$ = this._store.pipe(select(fromStore.getSetorHandle));

                        this.setorHandle$.pipe(
                            takeUntil(this._unsubscribeAll)
                        ).subscribe(
                            setor => {
                                if (setor) {
                                    this.setor = setor;
                                }
                            }
                        );
                    }
                }
            });

        this.modalidadeEtiquetaPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.etiqueta$.subscribe(
            etiqueta => {
                this.etiqueta = etiqueta;
                // if (this.etiqueta.vinculacoesModelos[0]?.setor) {
                //     this.etiqueta.setor = this.etiqueta.vinculacoesEt[0]?.setor;
                // }
                // if (this.etiqueta.vinculacoesModelos[0]?.unidade) {
                //     this.etiqueta.unidade = this.etiqueta.vinculacoesModelos[0]?.unidade;
                // }
                // if (this.etiqueta.vinculacoesModelos[0]?.usuario) {
                //     this.etiqueta.usuario = this.etiqueta.vinculacoesModelos[0]?.usuario;
                // }
                // if (this.etiqueta.vinculacoesModelos[0]?.orgaoCentral) {
                //     this.etiqueta.orgaoCentral = this.etiqueta.vinculacoesModelos[0]?.orgaoCentral;
                // }

            }
        );

        this.setor$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            setor => {
                if (setor) {
                    this.setor = setor;
                }
            }
        );

        this.unidade$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            setor => {
                if (setor) {
                    this.unidade = setor;
                }
            }
        );

        this.orgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            orgaoCentral => {
                if (orgaoCentral) {
                    this.orgaoCentral = orgaoCentral;
                }
            }
        );

        if (!this.etiqueta) {
            this.etiqueta = new Etiqueta();
            if (this.setor) {
                this.etiqueta.setor = this.setor;
            } else if (this.unidade) {
                this.etiqueta.unidade = this.unidade;
            } else {
                this.etiqueta.modalidadeOrgaoCentral = this.orgaoCentral;
            }
            this.etiqueta.ativo = true;
            this.etiqueta.corHexadecimal = '#D9E3F0';
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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

        if (this.setor) {
            etiqueta.setor = this.setor;
        } else if (this.unidade) {
            etiqueta.unidade = this.unidade;
        } else {
            etiqueta.modalidadeOrgaoCentral = this.orgaoCentral;
        }

        this._store.dispatch(new fromStore.SaveEtiqueta(etiqueta));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
