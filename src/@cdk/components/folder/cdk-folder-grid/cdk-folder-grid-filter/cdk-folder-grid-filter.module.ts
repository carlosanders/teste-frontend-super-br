import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FolderService} from '@cdk/services/folder.service';
import {CdkFolderGridFilterComponent} from './cdk-folder-grid-filter.component';

@NgModule({
    declarations: [
        CdkFolderGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        FolderService,
    ],
    exports: [
        CdkFolderGridFilterComponent
    ]
})
export class CdkFolderGridFilterModule {
}
