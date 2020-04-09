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
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {FolderService} from '@cdk/services/folder.service';
import {CdkFolderGridComponent} from './cdk-folder-grid.component';
import {CdkFolderAutocompleteModule} from '@cdk/components/folder/cdk-folder-autocomplete/cdk-folder-autocomplete.module';
import {CdkFolderFilterModule} from '../sidebars/cdk-folder-filter/cdk-folder-filter.module';
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
        CdkFolderFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
