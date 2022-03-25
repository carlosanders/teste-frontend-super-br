import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Folder, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {FolderTarefaState} from './store';
import {Subject} from 'rxjs';
import {distinctUntilChanged, filter, takeUntil, withLatestFrom} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState, RouterStateUrl} from 'app/store';
import * as _ from 'lodash';
import {IInfiniteScrollEvent} from 'ngx-infinite-scroll';

@Component({
    selector: 'board-tarefas',
    templateUrl: './board-tarefas.component.html',
    styleUrls: ['./board-tarefas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class BoardTarefasComponent implements OnInit, OnDestroy {

    folderEntrada: Folder = null;
    folderList: Folder[] = [];
    foldersIsLoading: boolean = false;
    pagination: any = new Pagination();
    private _unsubscribeAll: Subject<any> = new Subject();
    private _routerState: RouterStateUrl = null;
    private _params = {
        listFilter: {},
        etiquetaFilter: {},
        limit: 10,
        offset: 0,
        sort: {dataHoraDistribuicao: 'DESC'},
        populate: [
            'folder',
            'processo',
            'colaborador.usuario',
            'setor.especieSetor',
            'setor.generoSetor',
            'setor.parent',
            'setor.unidade',
            'processo.especieProcesso',
            'processo.especieProcesso.generoProcesso',
            'processo.modalidadeMeio',
            'processo.documentoAvulsoOrigem',
            'especieTarefa',
            'usuarioResponsavel',
            'setorResponsavel',
            'setorResponsavel.unidade',
            'setorOrigem',
            'setorOrigem.unidade',
            'especieTarefa.generoTarefa',
            'vinculacoesEtiquetas',
            'vinculacoesEtiquetas.etiqueta',
            'vinculacaoWorkflow'
        ],
        context: {}
    };
    private _genero: string = null;
    private _folderTarefasList: FolderTarefaState[] = [];

    constructor(private _store: Store<fromStore.BoardTarefasAppState>,
                private _loginService: LoginService,
                private _changeRef: ChangeDetectorRef) {
        this._store.pipe(
            takeUntil(this._unsubscribeAll),
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this._routerState = routerState.state;
            this._genero = this._routerState?.params['generoHandle']?.toUpperCase();
        });

        this._store.pipe(
            select(fromStore.getFolders),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            withLatestFrom(
                this._store.pipe(
                    select(fromStore.getFolderTarefas)
                )
            ),
            filter(
                ([folderList, folderTarefasList]) => folderList !== undefined
                    && (
                        !folderList.length
                        || folderList.length !== this.folderList.filter(folder => !!folder.id).length
                    )
            )
        ).subscribe(([folderList, folderTarefasList]) => {
            this._folderTarefasList = folderTarefasList || [];
            const folderTarefasEntrada = _.find(this._folderTarefasList, {folderNome: 'ENTRADA'});

            if (!folderTarefasEntrada) {
                this.getTarefasEntrada();
            }

            folderList.forEach((folder) => {
                const folderTarefas = _.find(this._folderTarefasList, {folderNome: folder.nome.toUpperCase()});

                if (!folderTarefas) {
                    this.getTarefasFolder(folder, this._params);
                }
            });

            this.folderList = folderList;
        });

        this._store.pipe(
            select(fromStore.getIsLoadingFolder),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged()
        ).subscribe(loading => this.foldersIsLoading = loading);

        this._store.pipe(
            select(fromStore.getFolderPagination),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged()
        ).subscribe(pagination => this.pagination = pagination);
    }

    ngOnInit(): void {
        this.folderEntrada = new Folder();
        this.folderEntrada.nome = 'Entrada';

        const folderTarefasEntrada = _.find(this._folderTarefasList, {folderNome: 'ENTRADA'});

        if (!folderTarefasEntrada) {
            this.getTarefasEntrada();
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getTarefasFolder(folder: Folder, params: any): void {
        params['filter'] = {
            'usuarioResponsavel.id': 'eq:' + this._loginService.getUserProfile().id,
            'dataHoraConclusaoPrazo': 'isNull',
            'folder.nome': `eq:${folder.nome.toUpperCase()}`,
            'especieTarefa.generoTarefa.nome': `eq:${this._genero.toUpperCase()}`
        };

        this._store.dispatch(new fromStore.GetTarefas({
            pagination: {
                ...params
            },
            nome: folder.nome.toUpperCase(),
            increment: false
        }));
    }

    getTarefasEntrada(): void {
        const filters = {
            'usuarioResponsavel.id': 'eq:' + this._loginService.getUserProfile().id,
            'dataHoraConclusaoPrazo': 'isNull',
            'especieTarefa.generoTarefa.nome': `eq:${this._genero.toUpperCase()}`,
            'folder.nome': 'isNull'
        };

        const params = {
            ...this._params,
            context: {modulo: this._genero},
            filter: filters
        };

        this._store.dispatch(new fromStore.GetTarefas({
            pagination: {
                ...params
            },
            nome: 'ENTRADA',
            increment: false
        }));
    }

    loadMoreFolders(event: IInfiniteScrollEvent): void {
        if (this.folderList.length >= this.pagination?.total) {
            return;
        }

        const params = {
            ...this.pagination,
            limit: 10,
            offset: this.folderList.length,
            increment: true
        };

        this._store.dispatch(new fromStore.GetFolders(params));
    }
}
