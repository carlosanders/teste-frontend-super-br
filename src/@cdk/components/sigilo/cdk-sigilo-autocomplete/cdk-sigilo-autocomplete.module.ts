import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloAutocompleteComponent} from './cdk-sigilo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkSigiloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloAutocompleteComponent
    ]
})
export class CdkSigiloAutocompleteModule {
}
