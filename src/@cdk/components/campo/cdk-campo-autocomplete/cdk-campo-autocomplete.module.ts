import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CampoService } from '@cdk/services/campo.service';
import {CdkCampoAutocompleteComponent} from './cdk-campo-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCampoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoAutocompleteComponent
    ]
})
export class CdkCampoAutocompleteModule {
}
