import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {Tarefa} from '@cdk/models/tarefa.model';

@Component({
    selector: 'documento-avulso-create',
    templateUrl: './documento-avulso-create.component.html',
    styleUrls: ['./documento-avulso-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoAvulsoCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    documentoAvulso: DocumentoAvulso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    routerState: any;

    /**
     * @param _store
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoCreateAppState>,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'documento_avulso')
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

        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.dataHoraInicioPrazo = moment();
        this.documentoAvulso.dataHoraFinalPrazo = moment().add(5, 'days').set({'hour': 20, 'minute': 0, 'second': 0});
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

        this.tarefas.forEach(tarefaBloco => {
            const documentoAvulso = new DocumentoAvulso();

            Object.entries(values).forEach(
                ([key, value]) => {
                    documentoAvulso[key] = value;
                }
            );

            documentoAvulso.processo = tarefaBloco.processo;
            documentoAvulso.tarefaOrigem = tarefaBloco;

            this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));
        });
    }
}
