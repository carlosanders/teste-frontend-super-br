import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthGuard } from './main/guard';
import { LoginInterceptor } from './main/auth/login/login.interceptor';
import { LogoutInterceptor } from './main/auth/login/logout.interceptor';
import { LoginService } from './main/auth/login/login.service';

import { FakeDbService } from 'app/fake-db/fake-db.service';

import {ModelModule} from '@cdk/models/model.module';

import {MAT_DATE_LOCALE} from '@angular/material';
import {ErrorInterceptor} from './main/auth/login/error.interceptor';

registerLocaleData(localePt, 'pt');

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
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

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // App modules
        LayoutModule,
        AppStoreModule,
        ModelModule
    ],
    providers: [
        LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        { provide: LOCALE_ID, useValue: 'pt'},
        AuthGuard
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
