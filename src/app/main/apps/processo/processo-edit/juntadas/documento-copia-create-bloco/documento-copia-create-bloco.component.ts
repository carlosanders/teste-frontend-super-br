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
import {getOperacoesState, getRouterState} from 'app/store/reducers';
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
    routerState: any;

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
            select(getOperacoesState),
            takeUntil(this._unsubscribeAll),
            filter(op => !!op && !!op.content && op.type === 'cópia da juntada')
        ).subscribe((operacao) => {
            this.operacoes.push(operacao);
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.juntadas.forEach((juntada) => {
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
                operacaoId: operacaoId
            }));
        });
    }

    abort(): void {
        this._store.dispatch(new Back());
    }
}
