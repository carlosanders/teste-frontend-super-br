import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {navigation} from 'app/navigation/navigation';
import {locale as navigationEnglish} from 'app/navigation/i18n/en';
import {environment} from '../environments/environment';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {EventSourcePolyfill} from 'event-source-polyfill';
import * as fromStore from 'app/store';
import {SetScreen} from 'app/store';
import {modulesConfig} from '../modules/modules-config';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    resize$: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param document
     * @param _fuseConfigService
     * @param _fuseNavigationService
     * @param _fuseSidebarService
     * @param _fuseSplashScreenService
     * @param _fuseTranslationLoaderService
     * @param _translateService
     * @param _platform
     * @param _store
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _store: Store<State>
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
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish);

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
         **/

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });


        if (localStorage.getItem('userProfile')) {
            const userProfile = JSON.parse(localStorage.getItem('userProfile'));
            const EventSource = EventSourcePolyfill;
            const es = new EventSource(environment.mercure_hub + '?topic=' + userProfile.username,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOltdfX0.R2VYhXy7uBsCqiXb9TRhEccaAiidwkZm_1sQP0JPutw'
                    }
                }
            );
            es.onmessage = e => {
                const message = JSON.parse(e.data);
                this._store.dispatch(new fromStore.Message({
                    type: Object.keys(message)[0],
                    content: Object.values(message)[0]
                }));
            };
        }

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
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
