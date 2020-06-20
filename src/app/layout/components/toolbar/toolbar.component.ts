import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {of, Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {CdkConfigService} from '@cdk/services/config.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {Router} from '@angular/router';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getMercureState} from 'app/store';
import {Logout} from '../../../main/auth/login/store/actions';
import {Usuario} from "../../../../@cdk/models/usuario.model";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    userProfile: Usuario;

    notificacoesCount: number;

    // Private
    private _unsubscribeAll: Subject<any>;

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
        private _cdkConfigService: CdkConfigService,
        private _cdkSidebarService: CdkSidebarService,
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
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
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
        this._cdkSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        this._router.navigate(['apps/pesquisa/processos/' + value.replace(/\D/g, '')]);
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

    ngAfterViewInit(): void {
        if (this.userProfile && this.userProfile.id) {
            this._store
                .pipe(
                    select(getMercureState),
                    takeUntil(this._unsubscribeAll)
                ).subscribe(message => {
                if (message && message.type === 'count_notificacao') {
                    switch (message.content.action) {
                        case 'count_notificacao':
                            this.notificacoesCount = message.content.count;
                            break;
                    }
                }
            });
        }
    }
}
