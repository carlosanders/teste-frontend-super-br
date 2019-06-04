import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalAutocompleteComponent} from './cdk-componente-digital-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ComponenteDigitalService,
    ],
    exports: [
        CdkComponenteDigitalAutocompleteComponent
    ]
})
export class CdkComponenteDigitalAutocompleteModule {
}
