import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject, fromEvent, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap} from 'rxjs/operators';

import {CdkConfigService} from '@cdk/services/config.service';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkSplashScreenService} from '@cdk/services/splash-screen.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {navigation} from 'app/navigation/navigation';
import {locale as navigationEnglish} from 'app/navigation/i18n/en';
import {select, Store} from '@ngrx/store';
import {getMercureState, State} from 'app/store/reducers';
import {SetScreen} from 'app/store';
import {modulesConfig} from '../modules/modules-config';
import {LoginService} from './main/auth/login/login.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    cdkConfig: any;
    navigation: any;
    resize$: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param document
     * @param _cdkConfigService
     * @param _cdkNavigationService
     * @param _cdkSidebarService
     * @param _cdkSplashScreenService
     * @param _cdkTranslationLoaderService
     * @param _translateService
     * @param _platform
     * @param _store
     * @param _loginService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _cdkConfigService: CdkConfigService,
        private _cdkNavigationService: CdkNavigationService,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkSplashScreenService: CdkSplashScreenService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _store: Store<State>,
        private _loginService: LoginService
    ) {
        // Get default navigation
        this.navigation = navigation;

        modulesConfig.forEach((module) => {
            if (module.mainMenu) {
                module.mainMenu.forEach((i) => {
                    i.entries.forEach((j) => {
                        this.navigation[0].children.forEach((n, idx) => {
                            if (n.id === i.id) {
                                this.navigation[0].children[idx].children.push(j);
                            }
                        });
                    });
                });
            }
        });

        // Register the navigation to the service
        this._cdkNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._cdkNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._cdkTranslationLoaderService.loadTranslations(navigationEnglish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         */

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.

        setTimeout(() => {
            this._translateService.setDefaultLang('en');
        });

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._loginService.init();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.cdkConfig = config;

                // Boxed
                if (this.cdkConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.cdkConfig.colorTheme);
            });

        this.resize$ = fromEvent(window, 'resize')
            .pipe(
                debounceTime(200),
                map(() => window.innerWidth),
                distinctUntilChanged(),
                startWith(window.innerWidth),
                tap(width => {
                    let payload = 'mobile';
                    if (width > 425 && width <= 1024) {
                        payload = 'tablet';
                    }
                    if (width > 1024) {
                        payload = 'desktop';
                    }
                    this._store.dispatch(new SetScreen(
                        payload
                    ));
                }),
            );
        this.resize$.subscribe();

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(message => {
            if (message && message.type === 'count_tarefa') {
                switch (message.content.action) {
                    case 'count_tarefa_administrativa':
                        this._cdkNavigationService.updateNavigationItem('tarefasAdministrativas', {
                            badge    : {
                                title    : message.content.count
                            }
                        });
                        break;
                    case 'count_calendar':
                        this._cdkNavigationService.updateNavigationItem('calendar', {
                            badge: {
                                title: message.content.count
                            }
                        });
                        break;
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
        this._cdkSidebarService.getSidebar(key).toggleOpen();
    }
}
