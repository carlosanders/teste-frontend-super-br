import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Aviso, ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'aviso-edit',
    templateUrl: './aviso-edit.component.html',
    styleUrls: ['./aviso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AvisoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    aviso: Aviso;
    aviso$: Observable<Aviso>;

    setor$: Observable<Setor>;
    setorHandle$: Observable<Setor>;
    setor: Setor = null;

    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral = null;

    unidade$: Observable<Setor>;
    unidadeHandle$: Observable<Setor>;
    unidade: Setor = null;

    usuario: Usuario;

    formAviso: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.AvisoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.aviso$ = this._store.pipe(select(fromStore.getAviso));
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
                    takeUntil(this._unsubscribeAll),
                    filter(setor => !!setor)
                ).subscribe((setor) => {
                    this.setor = setor;
                });
            }
        });
        this.loadForm();
    }

    loadForm(): void {
        this.formAviso = this._formBuilder.group({
            id: [null],
            ativo: [null],
            nome: [null],
            descricao: [null],
            orgaoCentral: [null],
            unidade: [null],
            setor: [null],
            tipo: [null],
            sistema: [null],
        });
    }

    ngOnInit(): void {
        this.aviso$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(aviso => !!aviso)
        ).subscribe((aviso) => {
            this.aviso = aviso;
            if (this.aviso.vinculacoesAvisos[0]?.setor) {
                this.aviso.setor = this.aviso.vinculacoesAvisos[0]?.setor;
            }
            if (this.aviso.vinculacoesAvisos[0]?.unidade) {
                this.aviso.unidade = this.aviso.vinculacoesAvisos[0]?.unidade;
            }
            if (this.aviso.vinculacoesAvisos[0]?.usuario) {
                this.aviso.usuario = this.aviso.vinculacoesAvisos[0]?.usuario;
            }
            if (this.aviso.vinculacoesAvisos[0]?.modalidadeOrgaoCentral) {
                this.aviso.modalidadeOrgaoCentral = this.aviso.vinculacoesAvisos[0]?.modalidadeOrgaoCentral;
            }
        });

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

        if (!this.aviso) {
            this.aviso = new Aviso();
            this.aviso.ativo = true;
            if (this.setor) {
                this.aviso.setor = this.setor;
            } else if (this.unidade) {
                this.aviso.unidade = this.unidade;
            } else {
                this.aviso.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
            }
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submitAviso(values): void {
        const aviso = new Aviso();
        Object.entries(values).forEach(
            ([key, value]) => {
                aviso[key] = value;
            }
        );
        if (this.setor) {
            aviso.setor = this.setor;
        } else if (this.unidade) {
            aviso.unidade = this.unidade;
        } else {
            aviso.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAviso({
            aviso: aviso,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
