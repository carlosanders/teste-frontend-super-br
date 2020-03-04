import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/tarefas/store';
import {Folder} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {Lotacao, Setor, Usuario, VinculacaoUsuario} from '@cdk/models';

@Component({
    selector: 'tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    folders$: Observable<Folder[]>;

    mode = 'Tarefas';

    routerState: any;

    generoHandle = '';
    typeHandle = '';

    setoresCoordenacao: Setor[] = [];

    usuariosAnalista: Usuario[] = [];

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TarefasAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _loginService: LoginService
    ) {
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (routerState.state.params['targetHandle'] === 'compartilhadas') {
                    this.mode = 'Compartilhadas';
                } else {
                    this.mode = 'Tarefas';
                }
                this.generoHandle = routerState.state.params['generoHandle'];
                this.typeHandle = routerState.state.params['typeHandle'];
            }
        });

        this.setoresCoordenacao = [];

        this._loginService.getUserProfile().colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (lotacao.coordenador) {
                this.setoresCoordenacao.push(lotacao.setor);
            }
        });

        this.usuariosAnalista = [];

        this._loginService.getUserProfile().vinculacoesUsuariosPrincipais.forEach((vinculacaoUsuario: VinculacaoUsuario) => {
            this.usuariosAnalista.push(vinculacaoUsuario.usuario);
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateTarefa());
    }

    onDrop($event): void {
        if (this.mode === 'Tarefas') {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: $event[0].data, folder: $event[1]}));
        }
    }
}
