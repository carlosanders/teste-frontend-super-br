import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaAutocompleteComponent} from './cdk-juntada-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkJuntadaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        JuntadaService,
    ],
    exports: [
        CdkJuntadaAutocompleteComponent
    ]
})
export class CdkJuntadaAutocompleteModule {
}
