import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { PaisService } from '@cdk/services/pais.service';
import {CdkPaisAutocompleteComponent} from './cdk-pais-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkPaisAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        PaisService,
    ],
    exports: [
        CdkPaisAutocompleteComponent
    ]
})
export class CdkPaisAutocompleteModule {
}
