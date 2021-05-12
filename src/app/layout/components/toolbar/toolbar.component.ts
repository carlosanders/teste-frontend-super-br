import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {CdkConfigService} from '@cdk/services/config.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {navigation} from 'app/navigation/navigation';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getCounterState} from 'app/store';
import {Logout} from '../../../main/auth/login/store';
import {Usuario} from '@cdk/models/usuario.model';
import {Notificacao} from '@cdk/models';
import {getIsLoading, getNormalizedNotificacaoEntities, getOperacoesEmProcessamento} from '../../../store';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    userProfile: Usuario;
    notificacoes: Notificacao[] = [];
    notificacoesCount: string;
    carregandoNotificacao = true;
    cdkConfig: any;

    quickPanelLockedOpen: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    operacoesProcessando = 0;
    operacoesPendentes = 0;
    shepherdService: any;

    /**
     *
     * @param _cdkConfigService
     * @param _cdkSidebarService
     * @param _translateService
     * @param _loginService
     * @param _notificacaoService
     * @param _store
     * @param _router
     */
    constructor(
        public _cdkConfigService: CdkConfigService,
        public _cdkSidebarService: CdkSidebarService,
        private _translateService: TranslateService,
        public _loginService: LoginService,
        private _notificacaoService: NotificacaoService,
        private _store: Store<fromStore.State>,
        private _router: Router
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.userProfile = this._loginService.getUserProfile();

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                // Subscribe to config changes
                this.cdkConfig = settings;
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});

        this._store
            .pipe(
                select(getNormalizedNotificacaoEntities),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe(notificacoes => {
                this.notificacoes = notificacoes;
            });
        this._store
            .pipe(
                select(getIsLoading),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe(carregandoNotificacao => this.carregandoNotificacao = carregandoNotificacao);

        this._store
            .pipe(
                select(getCounterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(value => {
                if (value && value['notificacoes_pendentes'] !== undefined) {
                    if (parseInt(value['notificacoes_pendentes']) > 99) {
                        this.notificacoesCount = '99+';
                    } else {
                        this.notificacoesCount = value['notificacoes_pendentes'];
                    }
                }
            }
        );
        this._store
            .pipe(
                select(getOperacoesEmProcessamento),
                takeUntil(this._unsubscribeAll)
            ).subscribe(value => {
                this.operacoesProcessando = Object.keys(value).length;
                if (this.operacoesProcessando === 0) {
                    this.operacoesPendentes = 0;
                } else {
                    if (this.operacoesProcessando > this.operacoesPendentes) {
                        this.operacoesPendentes = this.operacoesProcessando;
                    }
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        if (key === 'ajudaPanel') {
            if (!this._cdkSidebarService.getSidebar('quickPanel').isLockedOpen) {
                this._cdkSidebarService.getSidebar('quickPanel').close();
            } else {
                this._cdkSidebarService.getSidebar('quickPanel').fold();
            }
        }
        this._cdkSidebarService.getSidebar(key).toggleOpen();
    }

    toggleQuickPanel(): void {
        if (!this._cdkSidebarService.getSidebar('quickPanel').isLockedOpen) {
            this._cdkSidebarService.getSidebar('quickPanel').toggleOpen();
        } else {
            this._cdkSidebarService.getSidebar('quickPanel').toggleFold();
        }
    }

    /**
     * Search
     *
     * @param emissao
     */
    search(emissao): void {
        const chaveAcesso = emissao.chaveAcesso ? '/' + emissao.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + emissao.id + '/visualizar' + chaveAcesso]);
    }

    goConfiguracoes(): void {
        this._router.navigate(['apps/configuracoes/perfil']);
    }

    goNotificacoes(): void {
        this._router.navigate(['apps/configuracoes/notificacoes']);
    }

    goLogout(): void {
        this._store.dispatch(new Logout({url: false}));
    }

    titulo = 'processo';

    tour(tour: string): void {
        this.titulo = tour;
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    toggleLida(notificacao: Notificacao): void {
        this._store.dispatch(new fromStore.ToggleLidaNotificacao(notificacao));
    }
}
