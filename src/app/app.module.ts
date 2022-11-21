import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, RouterModule} from '@angular/router';
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

import {ModelModule} from '@cdk/models';
import {ErrorInterceptor} from './main/auth/login/error.interceptor';
import {LoginStoreModule} from './main/auth/login/store/store.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkLoginDialogModule} from '@cdk/components/login/cdk-login-dialog/cdk-login-dialog.module';
import {MatStepperIntl} from '@angular/material/stepper';
import {CdkMatStepperIntl} from '../@cdk/angular/cdk-mat-stepper-intl';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CdkMatPaginatorIntl} from '../@cdk/angular/cdk-mat-paginator-intl';
import {GlobalErrorHandler} from './global-error-handler';
import {AssinaturaService} from '../@cdk/services/assinatura.service';
import {DocumentoService} from '../@cdk/services/documento.service';
import {AvaliacaoService} from '../@cdk/services/avaliacao.service';
import {ObjetoAvaliadoService} from '../@cdk/services/objeto-avaliado.service';
import {modulesConfig} from '../modules/modules-config';

registerLocaleData(localePt, 'pt');

let routes = [
    {
        path: 'apps',
        loadChildren: (): any => import('./main/apps/apps.module').then(m => m.AppsModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'documento',
        loadChildren: () => import('./main/apps/componente-digital/componente-digital-link.module').then(m => m.ComponenteDigitalLinkModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'acesso-negado',
        loadChildren: () => import('./main/apps/componente-digital/componente-digital-acesso-negado/componente-digital-acesso-negado.module').then(m => m.ComponenteDigitalAcessoNegadoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: (): any => import('./main/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'pages',
        loadChildren: (): any => import('./main/pages/pages.module').then(m => m.PagesModule)
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

let httpInterceptors = [
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];

let rootModules = [];
let childModules = [];

const path = 'app';
modulesConfig.forEach((module: any) => {
    if (module.hasOwnProperty('extension')) {
        const extension = new module.extension();

        rootModules = [
            ...rootModules,
            extension.forRoot()
        ];
        childModules = [
            ...childModules,
            extension.forChild(path)
        ];
        routes = extension.manageRoutes(path, routes);
        httpInterceptors = extension.manageInterceptors(path, httpInterceptors);
    }
});

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, routingConfiguration),

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
        ModelModule,
        ...rootModules,
        ...childModules
    ],
    providers: [
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
        ...httpInterceptors,
        {provide: MatStepperIntl, useClass: CdkMatStepperIntl},
        {provide: MatPaginatorIntl, useClass: CdkMatPaginatorIntl},
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: LOCALE_ID, useValue: 'pt'},
        {provide: AssinaturaService, useClass: AssinaturaService},
        {provide: DocumentoService, useClass: DocumentoService},
        {provide: AvaliacaoService, useClass: AvaliacaoService},
        {provide: ObjetoAvaliadoService, useClass: ObjetoAvaliadoService},
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
