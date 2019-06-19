import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Etiqueta} from '@cdk/models/etiqueta.model';

@Component({
    selector: 'vinculacao-etiqueta-create',
    templateUrl: './vinculacao-etiqueta-create.component.html',
    styleUrls: ['./vinculacao-etiqueta-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VinculacaoEtiquetaCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    vinculacaoEtiqueta: VinculacaoEtiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

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
        private _store: Store<fromStore.VinculacaoEtiquetaCreateAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();

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
                filter(op => !!op && !!op.content && op.type === 'vinculacao_etiqueta')
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

        this.tarefas.forEach(tarefa => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();

            Object.entries(this.etiquetas).forEach(
                ([key, etiqueta]) => {
                    vinculacaoEtiqueta.etiqueta = etiqueta;
                }
            );

            vinculacaoEtiqueta.tarefa = tarefa;
            vinculacaoEtiqueta.privada = false;

            this._store.dispatch(new fromStore.SaveVinculacaoEtiqueta(vinculacaoEtiqueta));
        });
    }
}
