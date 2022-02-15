import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {ComponenteDigital, Tarefa} from '@cdk/models';
import {getSelectedTarefas} from '../store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'upload-bloco',
    templateUrl: './upload-bloco.component.html',
    styleUrls: ['./upload-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UploadBlocoComponent implements OnInit, OnDestroy {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    tarefas$: Observable<Tarefa[]>;
    tarefasBloco: Tarefa[] = [];
    tarefaPrincipal: Tarefa;
    tarefas: Tarefa[] = [];

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
        private _store: Store<fromStore.UploadBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this._profile = _loginService.getUserProfile();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
            this.tarefaPrincipal = tarefas[0] ? tarefas[0] : null;
            this.tarefasBloco = tarefas[1] ? tarefas.filter(t => t.id !== tarefas[0].id) : [];
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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

    upload(): void {
        this.operacoes = [];
        this.cdkUpload.upload();
    }

    onStartedUpload(): void {
        this._store.dispatch(new fromStore.UploadIniciado(this.tarefas.map(tarefa => tarefa.id)));
    }

    onComplete(componenteDigital: ComponenteDigital): void {
        this.operacoes.push({
            type: 'upload',
            content: 'Upload realizado com sucesso!',
            success: true
        });
        this._changeDetectorRef.markForCheck();
    }

    onCompleteAll(): void {
        this.tarefas.forEach((tarefa) => {
            this._store.dispatch(new fromStore.UploadConcluido(tarefa.id));
        });
    }
}
