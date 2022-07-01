import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap} from 'rxjs/operators';

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
import * as AssinaturaStore from 'app/store';
import {UpdateData} from '../@cdk/ngrx-normalizr';
import {Documento} from '../@cdk/models';
import {documento as documentoSchema} from '../@cdk/normalizr';
import {RouterHistoryService} from '../@cdk/utils/router-history.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@cdk/angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    cdkConfig: any;
    navigation: any;
    resize$: any;
    assinaturaErrors$: Observable<any>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    // Private
    private _assinandoDocumentosId$: Observable<number[]>;
    private _javaWebStartOK = false;
    private _assinaturaInterval = null;
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
     * @param _routerHistoryService
     * @param snackBar
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
        private _loginService: LoginService,
        private _routerHistoryService: RouterHistoryService,
        private snackBar: MatSnackBar
    ) {
        // Get default navigation
        this.navigation = navigation;

        modulesConfig.forEach((module) => {
            if (module.mainMenu) {
                module.mainMenu.forEach((i) => {
                    this.navigation[0].children.forEach((n) => {
                        if (n.id === i.id) {
                            i.entries.forEach((j) => {
                                n.children.push(j);
                            });

                            n.role = [].concat(i['role'] ?? [], n.role);
                        }
                    });
                    if (i.id === 'modulos') {
                        i.entries.forEach((j) => {
                            this.navigation[1].children.push(j);
                        });
                    }
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
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.cdkConfig.colorTheme);
            });
        this._assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.assinaturaErrors$ = this._store.pipe(select(AssinaturaStore.getAssinaturaErrors));
        this.resize$ = fromEvent(window, 'resize')
            .pipe(
                debounceTime(200),
                map(() => window.innerWidth),
                distinctUntilChanged(),
                startWith(window.innerWidth),
                tap((width) => {
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
        if (this._loginService.getUserProfile() && !this._loginService.isExpired()) {
            this._loginService.startCountdown();
        }
        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this._javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this._javaWebStartOK = false;
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this._javaWebStartOK = false;
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this._javaWebStartOK = false;
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({
                            id: message.content.documentoId,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }));
                        break;
                }
            }
        });

        this._assinandoDocumentosId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((assinandoDocumentosId) => {
            if (assinandoDocumentosId.length > 0) {
                if (this._assinaturaInterval) {
                    clearInterval(this._assinaturaInterval);
                }
                this._assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this._javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new AssinaturaStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this._assinaturaInterval);
            }
        });

        this.assinaturaErrors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((err) => {
            if (err && err.status && (err.status === 422 || err.status === 401)) {
                const error = (err.error.message || err.statusText || 'Erro desconhecido!').replace('Unknown Error', 'Erro Desconhecido!');
                this.snackBar.open(error, 'Fechar', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    panelClass: ['danger-snackbar'],
                    duration: 30000
                });
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
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
