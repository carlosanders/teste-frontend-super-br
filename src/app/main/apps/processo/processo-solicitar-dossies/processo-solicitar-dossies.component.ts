import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {DomSanitizer} from '@angular/platform-browser';
import {Back, getOperacoes} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {Dossie, Interessado, Processo, TipoDossie} from '../../../../../@cdk/models';
import {getProcesso} from '../store';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'processo-solicitar-dossies',
    templateUrl: './processo-solicitar-dossies.component.html',
    styleUrls: ['./processo-solicitar-dossies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoSolicitarDossiesComponent implements OnInit, OnDestroy {

    routerState: any;
    binary$: Observable<any>;
    interessados$: Observable<Interessado[]>;
    tiposDossie$: Observable<TipoDossie[]>;
    interessadosLoading$: Observable<boolean>;
    processo$: Observable<Processo>;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    lote: string = '';

    selectInteressados: Interessado[] = [];

    selectTiposDossie: TipoDossie[] = [];

    processo: Processo;

    src: any;
    loading = false;
    private _unsubscribeAll: Subject<any> = new Subject();

    getMetadado: boolean;
    metadados: any;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.ProcessoSolicitarDossiesAppState>
    ) {
        this.interessados$ = this._store.pipe(select(fromStore.getInteressadoList));
        this.tiposDossie$ = this._store.pipe(select(fromStore.getTiposDossieList));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.interessadosLoading$ = this._store.pipe(select(fromStore.getIsLoadingInteressados));

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
            this.operacoesPendentes = [];
            this.selectTiposDossie = [];
            this.selectInteressados = [];
        });

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'dossie' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'dossie'  && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnInit(): void {

        this.operacoes = [];
        this.getMetadado = true;

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            processo => this.processo = processo
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.operacoes = [];
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(): void {
        this.operacoes = [];
        this.lote = CdkUtils.makeId();

        this.selectInteressados.forEach((i) => {
            this.selectTiposDossie.forEach((td) => {
                const interessado = new Interessado();
                const tipoDossie = new TipoDossie();
                Object.entries(i).forEach(
                    ([key, value]) => {
                        interessado[key] = value;
                    }
                );
                Object.entries(td).forEach(
                    ([key, value]) => {
                        tipoDossie[key] = value;
                    }
                );

                const operacaoId = CdkUtils.makeId();

                const dossie = new Dossie();
                dossie.tipoDossie = tipoDossie;
                dossie.pessoa = interessado.pessoa;
                dossie.processo = this.processo;
                dossie.sobDemanda = true;
                this._store.dispatch(new fromStore.SaveDossies({
                    dossie,
                    operacaoId,
                    loteId: this.lote
                }));
            });
        });
    }

    selected(values): void {
        if(values.length === 0){
            this.selectTiposDossie = [];
            this.selectInteressados = [];
        }
        Object.entries(values).forEach(
            ([key, value]) => {
                this.selectInteressados[key] = value;
            }
        );
    }

    selectedTipoDossie(values): void {
        if (values.length === 0) {
            this.selectTiposDossie = [];
        }

        Object.entries(values).forEach(
            ([key, value]) => {
                this.selectTiposDossie[key] = value;
            }
        );
    }

    back(): void {
        this.operacoes = [];
        this._store.dispatch(new Back());
    }

    doAbort(): void {
        this.operacoes = [];
        this.operacoesPendentes = [];
        this.selectTiposDossie = [];
        this.selectInteressados = [];
    }

    reloadInteressados(): void {
        let processoId = null;
        const routeParams = of('processoHandle');
        routeParams.subscribe((param) => {
            processoId = `eq:${this.routerState.params[param]}`;
        });

        const params = {
            filter: {
                'processo.id': processoId
            },
            gridFilter: {},
            limit: 10,
            offset: 0,
            sort: {id: 'DESC'},
            populate: [
                'populateAll'
            ]
        };

        this._store.dispatch(new fromStore.GetInteressadosDossies(params));
    }
}
