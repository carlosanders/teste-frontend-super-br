import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';
import {Classificacao, Processo} from '@cdk/models';
import * as fromStore from '../arquivista-classificacao-bloco/store';
import {getOperacoesState, getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {getSelectedProcessos} from '../arquivista-list/store/selectors';
import {cdkAnimations} from '@cdk/animations';
import {MatDialog} from "@cdk/angular/material";
import {CdkProcessoModalClassificacaoRestritaComponent} from "@cdk/components/processo/cdk-processo-modal-classificacao-restrita/cdk-processo-modal-classificacao-restrita.component";

@Component({
    selector: 'arquivista-classificacao-bloco',
    templateUrl: './arquivista-classificacao-bloco.component.html',
    styleUrls: ['./arquivista-classificacao-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaClassificacaoBlocoComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processos$: Observable<Processo[]>;
    processos: Processo[];
    operacoes: any[] = [];

    private routerState: RouterStateUrl;

    constructor(
        private _store: Store<fromStore.ArquivistaClassificacaoBlocoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog
    ) {
        this.initObservales();

    }

    initObservales(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(getSelectedProcessos));
    }

    ngOnInit(): void {

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processos => this.processos = processos);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'classificacao')
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

    doSelectClassificacao(classificacao: Classificacao): void {
        if (classificacao.visibilidadeRestrita === true) {
            this.dialog.open(CdkProcessoModalClassificacaoRestritaComponent, {
                data: {},
                hasBackdrop: false,
                closeOnNavigation: true
            });
        }
    }

    submit(values): void {
        this.operacoes = [];
        this.processos.forEach(processo => {
            processo.classificacao = values.processo.classificacao;
            this._store.dispatch(new fromStore.SaveArquivistaClassificacaoBloco(processo));
        });
    }
}
