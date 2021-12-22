import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/calendario/store';
import {Coordenador, Folder, Setor, Usuario, VinculacaoUsuario} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';
import {Back} from "../../../../../store";

@Component({
    selector: 'calendario-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CalendarioMainSidebarComponent implements OnInit, OnDestroy {

    folders$: Observable<Folder[]>;
    routerState: any;
    generoHandle = '';
    typeHandle = '';
    setoresCoordenacao: Setor[] = [];
    usuariosAssessor: Usuario[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     * @param _cdkSidebarService
     */
    constructor(
        private _store: Store<fromStore.CalendarioAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.typeHandle = routerState.state.params['typeHandle'];
            this.generoHandle = routerState.state.params['generoHandle'];
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
        this._unsubscribeAll.next(true);
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

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('calendario-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('calendario-main-sidebar').close();
        }
    }
    cancel(): void {
        this._store.dispatch(new Back());
    }
}
