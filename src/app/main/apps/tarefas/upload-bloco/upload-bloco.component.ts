import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from '../store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {getSelectedTarefas} from '../store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';

@Component({
    selector: 'upload-bloco',
    templateUrl: './upload-bloco.component.html',
    styleUrls: ['./upload-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UploadBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefasBloco: Tarefa[] = [];
    tarefaPrincipal: Tarefa;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    @ViewChild('ckdUpload')
    cdkUpload;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefasAppState>,
        private _loginService: LoginService,
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
        ).subscribe(
            tarefas => {
                this.tarefaPrincipal = tarefas[0] ? tarefas[0] : null;
                this.tarefasBloco = tarefas[1] ? tarefas.filter(t => t.id !== tarefas[0].id) : [];
                this._changeDetectorRef.markForCheck();
            });

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
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

    upload(): void {
        this.operacoes = [];
        this.cdkUpload.upload();
    }

    onComplete(componenteDigital: ComponenteDigital): void {
        this.operacoes.push({
            type: 'upload',
            content: `Upload realizado com sucesso!`,
            success: true
        });
        this._changeDetectorRef.markForCheck();
    }
}
