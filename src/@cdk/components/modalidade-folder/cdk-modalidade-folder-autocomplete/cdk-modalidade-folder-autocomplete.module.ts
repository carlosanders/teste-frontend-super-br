import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import {CdkModalidadeFolderAutocompleteComponent} from './cdk-modalidade-folder-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeFolderAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeFolderService,
    ],
    exports: [
        CdkModalidadeFolderAutocompleteComponent
    ]
})
export class CdkModalidadeFolderAutocompleteModule {
}
