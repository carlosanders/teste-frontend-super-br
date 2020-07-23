import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef, OnChanges,
    OnDestroy,
    OnInit, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/tarefas/store';
import {Coordenador, Folder} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {Setor, Usuario, VinculacaoUsuario} from '@cdk/models';
import {modulesConfig} from '../../../../../../modules/modules-config';

@Component({
    selector: 'tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefasMainSidebarComponent implements OnInit, OnChanges, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    folders2$: BehaviorSubject<Folder[]>;
    folders$: Observable<Folder[]>;
    folders: Folder[];

    mode = 'Tarefas';

    links: any;

    routerState: any;

    generoHandle = '';
    typeHandle = '';

    setoresCoordenacao: Setor[] = [];

    usuariosAssessor: Usuario[] = [];

    @ViewChild('inputFolder') inputFolder: ElementRef;

    showAddFolder = false;

    showMenuItem = false

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TarefasAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
   ) {
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        const path = 'app/main/apps/tarefas/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

        // this.folders$.subscribe((folders) => this.folders = folders);
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

        this._loginService.getUserProfile().coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.setor) {
                this.setoresCoordenacao.push(coordenador.setor);
            }
        });

        this.usuariosAssessor = [];

        this._loginService.getUserProfile().vinculacoesUsuariosPrincipais?.forEach((vinculacaoUsuario: VinculacaoUsuario) => {
            this.usuariosAssessor.push(vinculacaoUsuario.usuario);
        });
    }



    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
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
        console.log($event);
        console.log($event[0].data);
        console.log("**********");
        console.log($event[1]);
        if (this.mode === 'Tarefas') {
            this._store.dispatch(new fromStore.SetFolderOnSelectedTarefas({tarefa: $event[0].data, folder: $event[1]}));
        }
    }

    showFolderComponent() {
        this.showAddFolder = true;
    }

    addFolder() {
        if(this.inputFolder.nativeElement.value.length>2) {
            const folder = new Folder();
            folder.nome = this.inputFolder.nativeElement.value;
            folder.descricao = this.inputFolder.nativeElement.value;
            folder.usuario = this._loginService.getUserProfile();
            this._store.dispatch(new fromStore.SaveFolder(folder));
            this.showAddFolder = false;
        }
    }

    delFolder(folder: Folder) {
        this._store.dispatch(new fromStore.DeleteFolder(folder.id));
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.folders$.subscribe((folders) => this.folders = folders);
    }
}
