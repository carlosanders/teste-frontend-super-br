import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Folder, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from 'modules/dynamic.service';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'tarefas-operacoes-bloco',
    templateUrl: './tarefas-operacoes-bloco.component.html',
    styleUrls: ['./tarefas-operacoes-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasOperacoesBlocoComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    folders$: Observable<Folder[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[];

    private _profile: any;

    routeAtividadeBloco = 'atividade-bloco';

    routerState: any;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;

    /**
     *
     * @param _dynamicService
     * @param _store
     * @param _loginService
     * @param _snackBar
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _dynamicService: DynamicService,
        private _store: Store<fromStore.State>,
        public _loginService: LoginService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(fromStoreTarefas.getSelectedTarefas));
        this.folders$ = this._store.pipe(select(fromStoreTarefas.getFolders));
        this.selectedIds$ = this._store.pipe(select(fromStoreTarefas.getSelectedTarefaIds));
        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selected => {
            this.selectedIds = selected;
            if (selected.length === 0) {
                this._router.navigate([
                    'apps',
                    'tarefas',
                    this.routerState.params.generoHandle,
                    this.routerState.params.typeHandle,
                    this.routerState.params.targetHandle
                ]).then();
            }
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

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/cdk-tarefa-list';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });

        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividade-bloco') &&
                module.routerLinks[path]['atividade-bloco'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividadeBloco = module.routerLinks[path]['atividade-bloco'][this.routerState.params.generoHandle];
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

    doDeleteTarefa(tarefaId: number): void {
        this._store.dispatch(new fromStoreTarefas.DeleteTarefa(tarefaId));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['fuse-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletado(a)'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStoreTarefas.DeleteTarefaCancel());
            } else {
                this._store.dispatch(new fromStoreTarefas.DeleteTarefaFlush());
            }
        });
    }

    doDeleteTarefaBloco(): void {
        this.selectedIds.forEach(tarefaId => this.doDeleteTarefa(tarefaId));
    }

    doCompartilharBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/compartilhamento-bloco']).then();
    }

    doEtiquetarBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doMovimentarBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/' + this.routeAtividadeBloco]).then();
    }

    doEditTarefaBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-edit-bloco']).then();
    }

    doRedistribuiTarefaBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco']).then();
    }

    doCienciaBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/redistribuicao-edit-bloco']).then();
    }

    doCreateTarefaBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/tarefa-bloco']).then();
    }

    doUploadBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/upload-bloco']).then();
    }

    doEditorBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/modelo-bloco']).then();
    }

    doCreateDocumentoAvulsoBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/documento-avulso-bloco']).then();
    }

    setFolder(folder): void {
        this.tarefas.forEach((tarefa) => {
            this._store.dispatch(new fromStoreTarefas.SetFolderOnSelectedTarefas({tarefa: tarefa, folder: folder}));
        });
    }

    doAbort(): void {
        this._store.dispatch(new fromStoreTarefas.ChangeSelectedTarefas([]));
    }
}
