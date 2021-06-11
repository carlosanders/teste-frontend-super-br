import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
