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

import {Documento, Juntada} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getCopiandoJuntadas} from '../juntada-list/store';
import {getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'documento-copia-create',
    templateUrl: './documento-copia-create-bloco.component.html',
    styleUrls: ['./documento-copia-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoCopiaCreateBlocoComponent implements OnInit, OnDestroy {

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[];

    documento: Documento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    routerState: any;
    lote: string;
    private _profile: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoCopiaCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.juntadas$ = this._store.pipe(select(getCopiandoJuntadas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(juntadas => this.juntadas = juntadas);

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'cópia da juntada' && operacao.lote === this.lote);
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'cópia da juntada' && operacao.lote === this.lote && operacao.status === 0);
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

    submit(values): void {

        this.operacoes = [];
        this.lote = CdkUtils.makeId();

        this.juntadas?.forEach((juntada) => {
            const documento = new Documento();

            Object.entries(values).forEach(
                ([key, value]) => {
                    documento[key] = value;
                }
            );

            documento.documentoOrigem = juntada.documento;
            documento.tipoDocumento = juntada.documento.tipoDocumento;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveDocumentoCopia({
                juntadaId: juntada.id,
                documento: documento,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

    abort(): void {
        this._store.dispatch(new Back());
    }
}
