import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProcessoDownloadComponent} from './processo-download.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkDownloadFormModule} from '@cdk/components/download/cdk-download-form/cdk-download-form.module';
import {ProcessoDownloadStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
    {
        path: '',
        component: ProcessoDownloadComponent
    }
];

const path = 'app/main/apps/processo/processo-download';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoDownloadComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTooltipModule,

        InfiniteScrollModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        CdkDownloadFormModule,
        ProcessoDownloadStoreModule,
        MatSnackBarModule,
    ],
    providers: [

    ]
})
export class ProcessoDownloadModule {
}
