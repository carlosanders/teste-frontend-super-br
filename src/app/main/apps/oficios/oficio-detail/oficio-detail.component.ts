import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {DeleteVinculacaoEtiqueta} from './store';
import {Documento, DocumentoAvulso, Etiqueta, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {getMaximizado} from '../store';
import {ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'oficio-detail',
    templateUrl: './oficio-detail.component.html',
    styleUrls: ['./oficio-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class OficioDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    savingVinculacaoEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;

    screen$: Observable<any>;

    documentos$: Observable<Documento[]>;
    documentos: Documento[];

    routerState: any;

    accept = 'application/pdf';

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;
    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];

    mobileMode = false;
    mode = 'entrada';
    chaveAcesso: any;
    private _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _dynamicService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.OficioDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this._profile = this._loginService.getUserProfile();
        this.documentoAvulso$ = this._store.pipe(select(fromStore.getDocumentoAvulso));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = this._profile.colaborador ? {
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
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:OFICIO'
                }
            ]
        } : {};

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.mode = routerState.state.params['oficioTargetHandle'];
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.documentoAvulso$.pipe(
            filter(documentoAvulso => !!documentoAvulso),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentoAvulso) => {
            this.documentoAvulso = documentoAvulso;
            this.vinculacoesEtiquetas = documentoAvulso.vinculacoesEtiquetas.filter((vinculacaoEtiqueta: VinculacaoEtiqueta) => vinculacaoEtiqueta.etiqueta.sistema);
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => this.documentos = documentos
        );

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            maximizado => this.maximizado = maximizado
        );

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    submit(): void {
    }

    /**
     * Deselect current mail
     */
    deselectCurrentOficio(): void {
        this._store.dispatch(new fromStore.DeselectDocumentoAvulsoAction());
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            documentoAvulso: this.documentoAvulso,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada},
            operacaoId: operacaoId
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            documentoAvulsoId: this.documentoAvulso.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id,
            operacaoId: operacaoId
        }));
    }

    complete(pending: number): void {
        if (pending === 0) {
            this._store.dispatch(new fromStore.GetDocumentos());
        }
    }

    doToggleMaximizado(): void {
        this._store.dispatch(new ToggleMaximizado());
    }
}
