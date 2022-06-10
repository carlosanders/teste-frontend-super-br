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
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';

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
    isXSmallScreen: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.CalendarioAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
        private _breakpointObserver: BreakpointObserver,
        private _router: Router
    ) {
        this._breakpointObserver
            .observe([Breakpoints.XSmall])
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged()
            )
            .subscribe((state: BreakpointState) => this.isXSmallScreen = state.matches);
    }

    /**
     * On init
     */
    ngOnInit(): void {

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
}
