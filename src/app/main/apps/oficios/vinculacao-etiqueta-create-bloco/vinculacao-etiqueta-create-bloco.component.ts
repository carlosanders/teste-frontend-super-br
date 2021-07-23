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

import {DocumentoAvulso, Etiqueta, Pagination, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedDocumentosAvulso} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
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

    private _unsubscribeAll: Subject<any> = new Subject();

    documentosAvulso$: Observable<DocumentoAvulso[]>;
    documentosAvulso: DocumentoAvulso[];

    vinculacaoEtiqueta: VinculacaoEtiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    etiquetas: Etiqueta[] = [];

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.VinculacaoEtiquetaCreateBlocoAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.documentosAvulso$ = this._store.pipe(select(getSelectedDocumentosAvulso));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();

        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:OFICIO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:OFICIO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:OFICIO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:OFICIO'
                }
            ]
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.documentosAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentosAvulso => this.documentosAvulso = documentosAvulso);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'vinculacao_etiqueta')
            )
            .subscribe(
                (operacao) => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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

        this.documentosAvulso.forEach((tarefa) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();

            Object.entries(this.etiquetas).forEach(
                ([key, etiqueta]) => {
                    vinculacaoEtiqueta.etiqueta = etiqueta;
                }
            );

            vinculacaoEtiqueta.documentoAvulso = tarefa;
            vinculacaoEtiqueta.privada = false;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveVinculacaoEtiqueta({
                vinculacaoEtiqueta: vinculacaoEtiqueta,
                operacaoId: operacaoId
            }));
        });
    }
}
