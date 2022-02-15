import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Etiqueta, Pagination, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import * as fromStoreRelatorio from '../store';
import {getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'vinculacao-etiqueta-create',
    templateUrl: './vinculacao-etiqueta-create-bloco.component.html',
    styleUrls: ['./vinculacao-etiqueta-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoEtiquetaCreateBlocoComponent implements OnInit, OnDestroy {

    relatorios$: Observable<Relatorio[]>;
    relatorios: Relatorio[];

    vinculacaoEtiqueta: VinculacaoEtiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;

    operacoes: any[] = [];

    routerState: any;

    etiquetas: Etiqueta[] = [];
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: any;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.VinculacaoEtiquetaCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.relatorios$ = this._store.pipe(select(fromStoreRelatorio.getSelectedRelatorios));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                }
            ]
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.relatorios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(relatorios => this.relatorios = relatorios);

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'vinculação etiqueta' && operacao.lote === this.lote);
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
    }

    submit(): void {
        this.operacoes = [];
        this.lote = CdkUtils.makeId();

        this.relatorios.forEach((relatorio) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();

            Object.entries(this.etiquetas).forEach(
                ([, etiqueta]) => {
                    vinculacaoEtiqueta.etiqueta = etiqueta;
                }
            );

            vinculacaoEtiqueta.relatorio = relatorio;
            vinculacaoEtiqueta.privada = false;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveVinculacaoEtiqueta({
                vinculacaoEtiqueta: vinculacaoEtiqueta,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }
}
