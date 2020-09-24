import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {Pagination, Processo, Transicao} from '../../../../../@cdk/models';
import * as fromStore from './store';
import {getOperacoesState, RouterStateUrl, getRouterState} from '../../../../store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../@cdk/animations';

@Component({
  selector: 'transicao-arquivista-bloco',
  templateUrl: './transicao-arquivista-bloco.component.html',
  styleUrls: ['./transicao-arquivista-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoArquivistaBlocoComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();
    loading: boolean;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;
    modalidadeTransicaoPagination: Pagination;
    total = 0;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    private routerState: RouterStateUrl;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    operacoes: any[] = [];

  constructor(
      private _store: Store<fromStore.TransicaoArquivistaBlocoAppState>,
      private _changeDetectorRef: ChangeDetectorRef,
  ) {
      this.loading = false;
      this.initObservales();
      this.modalidadeTransicaoPagination = new Pagination();
  }

  ngOnInit(): void {
      this.processos$.pipe(
          takeUntil(this._unsubscribeAll)
      ).subscribe(processos => this.processos = processos);

      this._store
          .pipe(
              select(getOperacoesState),
              takeUntil(this._unsubscribeAll),
              filter(op => !!op && !!op.content && op.type === 'transicao')
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

    private initObservales(): void {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));
    }

    submit(values): void {
        debugger;
        this.operacoes = [];
        this.processos.forEach(processo => {
            const transicao = new Transicao();
            Object.entries(values).forEach(
                ([key, value]) => {
                    transicao[key] = value;
                }
            );
            transicao.processo = processo;
            this._store.dispatch(new fromStore.SaveTransicaoArquivistaBloco(transicao));
        });
    }
}
