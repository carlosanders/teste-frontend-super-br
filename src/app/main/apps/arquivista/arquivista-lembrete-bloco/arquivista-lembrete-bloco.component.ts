import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, takeUntil} from 'rxjs/operators';

import * as fromStore from './store';
import {Lembrete, Processo} from '../../../../../@cdk/models';
import {getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {LembreteService} from '../../../../../@cdk/services/lembrete.service';
import {cdkAnimations} from '../../../../../@cdk/animations';

@Component({
    selector: 'arquivista-lembrete-bloco',
    templateUrl: './arquivista-lembrete-bloco.component.html',
    styleUrls: ['./arquivista-lembrete-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaLembreteBlocoComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    loading: boolean;
    lembretes: Lembrete;
    processos$: Observable<Processo[]>;
    processos: Processo[];
    total = 0;

    private routerState: RouterStateUrl;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    operacoes: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lembreteService: LembreteService,
        private _store: Store<fromStore.LembreteBlocoAppState>
    ) {
        this.loading = false;
        this.initObservales();
    }

    ngOnInit(): void {
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processos => this.processos = processos);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'lembrete')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });
    }

    initObservales(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
    }

    submit(values): void {
        this.operacoes = [];
        this.processos.forEach(processo => {
            const lembrete = new Lembrete();
            Object.entries(values).forEach(
                ([key, value]) => {
                    lembrete[key] = value;
                }
            );
            lembrete.processo = processo;
            this._store.dispatch(new fromStore.SaveLembreteBloco(lembrete));
        });
    }
}
