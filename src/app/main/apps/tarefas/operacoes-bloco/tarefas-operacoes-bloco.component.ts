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
import {getSelectedTarefas} from '../store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from 'modules/dynamic.service';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import {SnackBarDeleteComponent} from '@cdk/components/snack-bar-delete/snack-bar-delete.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDeleteService} from '@cdk/components/snack-bar-delete/snack-bar-delete.service';

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

    deleteTotal = false;
    tarefasDeletadasTemporiamente: Tarefa [] = [];
    sheetRef: MatSnackBarRef<SnackBarDeleteComponent>;

    /**
     *
     * @param _dynamicService
     * @param _store
     * @param _loginService
     * @param _snackBar
     * @param _router
     * @param _changeDetectorRef
     * @param _snackBarDeleteService
     */
    constructor(
        private _dynamicService: DynamicService,
        private _store: Store<fromStore.State>,
        public _loginService: LoginService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _snackBarDeleteService: SnackBarDeleteService,
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
        ).subscribe(selected => this.selectedIds = selected);

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

        const path2 = 'app/main/apps/tarefas';
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

    deleteTemporariamente(tarefaId): void {
        const tarefaDeletada = this.tarefas.filter(tarefa => tarefa.id === tarefaId);
        this.tarefasDeletadasTemporiamente.push(tarefaDeletada.shift());
    }

    desfazerDelete(tarefaId): void {
        this.deleteTotal = false;
        this.tarefasDeletadasTemporiamente = this.tarefasDeletadasTemporiamente.filter(tarefa => tarefa.id !== tarefaId);
        this._changeDetectorRef.detectChanges();
    }

    doDelete(tarefaId: number): void {
        this._store.dispatch(new fromStoreTarefas.DeleteTarefa(tarefaId));
    }

    doDeleteTarefa(tarefaId): void {
        this.deleteTemporariamente(tarefaId);

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDeleteComponent, this._snackBarDeleteService.config);

        this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this.desfazerDelete(tarefaId);
            } else {
                this.doDelete(tarefaId);
            }
        });
    }

    doDeleteTarefaBloco(): void {
        this.deleteTotal = this.selectedIds.length === this.tarefas.length;

        this.selectedIds.forEach(tarefaId => this.deleteTemporariamente(tarefaId));

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDeleteComponent, this._snackBarDeleteService.config);

        this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this.selectedIds.forEach(tarefaId => this.desfazerDelete(tarefaId));
                this.deleteTotal = false;
            } else {
                this.selectedIds.forEach(tarefaId => this.doDelete(tarefaId));
            }
        });

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
