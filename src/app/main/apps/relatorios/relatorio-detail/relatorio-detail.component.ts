import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {Relatorio} from '@cdk/models/relatorio.model';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {CreateVinculacaoEtiqueta, DeleteVinculacaoEtiqueta, SaveConteudoVinculacaoEtiqueta} from './store';
import {Documento, Etiqueta, Pagination, Usuario, VinculacaoEtiqueta} from '@cdk/models';
import {getMaximizado} from '../store';
import {ToggleMaximizado} from '../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {getScreenState} from 'app/store/reducers';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'relatorio-detail',
    templateUrl: './relatorio-detail.component.html',
    styleUrls: ['./relatorio-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    savingVincEtiquetaId$: Observable<any>;
    errors$: Observable<any>;

    relatorio$: Observable<Relatorio>;
    relatorio: Relatorio;

    screen$: Observable<any>;

    documentos$: Observable<Documento[]>;
    documentos: Documento[];

    routerState: any;

    accept = 'application/pdf';

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    mobileMode = false;

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
        private _store: Store<fromStore.RelatorioDetailAppState>,
        public _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this._profile = _loginService.getUserProfile();
        this.relatorio$ = this._store.pipe(select(fromStore.getRelatorio));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.maximizado$ = this._store.pipe(select(getMaximizado));
        this.screen$ = this._store.pipe(select(getScreenState));
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

        this.savingVincEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVincEtiquetaId));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/relatorios/relatorio-detail';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.relatorio$.pipe(
            filter(relatorio => !!relatorio),
            takeUntil(this._unsubscribeAll)
        ).subscribe((relatorio) => {
            this.relatorio = relatorio;
        });
        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentos => this.documentos = documentos);

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => this.maximizado = maximizado);

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
    deselectCurrentRelatorio(): void {
        this._store.dispatch(new fromStore.DeselectRelatorioAction());
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new CreateVinculacaoEtiqueta({}));
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({
            relatorio: this.relatorio,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new DeleteVinculacaoEtiqueta({
            relatorioId: this.relatorio.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    complete(pending: number): void {
        if (pending === 0) {
            this._store.dispatch(new fromStore.GetDocumentos({
                'relatorio.id': 'eq:' + this.relatorio.id
            }));
        }
    }

    doToggleMaximizado(valor: boolean): void {
        this._store.dispatch(new ToggleMaximizado(valor));
    }
}
