import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE, MatButtonModule, MatIconModule, MatSnackBarModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CKEditorModule} from 'ng2-ckeditor';
import 'hammerjs';

import {CdkModule} from '@cdk/cdk.module';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProgressBarModule, CdkSidebarModule, CdkThemeOptionsModule} from '@cdk/components';

import {cdkConfig} from 'app/cdk-config';

import {AppComponent} from './app.component';
import {AppStoreModule} from 'app/store/store.module';
import {LayoutModule} from 'app/layout/layout.module';
import {AuthGuard} from './main/guard';
import {LoginInterceptor} from './main/auth/login/login.interceptor';
import {LogoutInterceptor} from './main/auth/login/logout.interceptor';
import {LoginService} from './main/auth/login/login.service';

import {ModelModule} from '@cdk/models';
import {ErrorInterceptor} from './main/auth/login/error.interceptor';
import {LoginStoreModule} from './main/auth/login/store/store.module';
import {MatDialogModule} from "@angular/material/dialog";
import {CdkLoginDialogModule} from "@cdk/components/login/cdk-login-dialog/cdk-login-dialog.module";

registerLocaleData(localePt, 'pt');

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
//    onSameUrlNavigation: 'reload'
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, routingConfiguration),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,

        // Cdk modules
        CdkModule.forRoot(cdkConfig),
        CdkProgressBarModule,
        CdkSharedModule,
        CdkSidebarModule,
        CdkThemeOptionsModule,
        CdkLoginDialogModule,

        CKEditorModule,

        // InMemoryWebApiModule.forRoot(FakeDbService, {
        //     delay: 0,
        //     passThruUnknownUrl: true
        // }),

        // App modules
        LayoutModule,
        AppStoreModule,
        LoginStoreModule,
        ModelModule
    ],
    providers: [
        LoginService,
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: LOCALE_ID, useValue: 'pt'},
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
