import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {FolderService} from '@cdk/services/folder.service';
import {CdkFolderGridComponent} from './cdk-folder-grid.component';
import {CdkFolderAutocompleteModule} from '@cdk/components/folder/cdk-folder-autocomplete/cdk-folder-autocomplete.module';
import {CdkFolderGridFilterModule} from './cdk-folder-grid-filter/cdk-folder-grid-filter.module';
import {CdkFolderMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkFolderGridComponent,
        CdkFolderMainSidebarComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkFolderAutocompleteModule,
        CdkFolderGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        FolderService,
    ],
    exports: [
        CdkFolderGridComponent
    ]
})
export class CdkFolderGridModule {
}
