import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FolderService} from '@cdk/services/folder.service';
import {CdkFolderAutocompleteComponent} from './cdk-folder-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkFolderAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        FolderService,
    ],
    exports: [
        CdkFolderAutocompleteComponent
    ]
})
export class CdkFolderAutocompleteModule {
}
