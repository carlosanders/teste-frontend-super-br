import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ProcessoDownloadComponent} from './processo-download.component';
import {RouterModule, Routes} from '@angular/router';
import {MatAutocompleteModule, MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatRippleModule, MatTooltipModule} from '@cdk/angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkDownloadFormModule} from '@cdk/components/download/cdk-download-form/cdk-download-form.module';
import {ProcessoDownloadStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: ProcessoDownloadComponent
    }
];

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

        FuseSharedModule,
        FuseSidebarModule,
        MatRippleModule,
        CdkDownloadFormModule,
        ProcessoDownloadStoreModule
    ],
    providers: [

    ]
})
export class ProcessoDownloadModule {
}
