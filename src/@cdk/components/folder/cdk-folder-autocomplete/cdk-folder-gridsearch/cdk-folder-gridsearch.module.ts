import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {FolderService} from '@cdk/services/folder.service';
import {CdkFolderGridsearchComponent} from './cdk-folder-gridsearch.component';
import {CdkFolderGridModule} from '@cdk/components/folder/cdk-folder-grid/cdk-folder-grid.module';

@NgModule({
    declarations: [
        CdkFolderGridsearchComponent
    ],
    imports: [

        CdkFolderGridModule,

        CdkSharedModule,
    ],
    providers: [
        FolderService
    ],
    exports: [
        CdkFolderGridsearchComponent
    ]
})
export class CdkFolderGridsearchModule {
}
