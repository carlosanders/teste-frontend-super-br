import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {AvisoService} from '@cdk/services/aviso.service';
import {CdkAvisoAutocompleteComponent} from './cdk-aviso-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAvisoAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        PipesModule,
        CdkSharedModule,
    ],
    providers: [
        AvisoService,
    ],
    exports: [
        CdkAvisoAutocompleteComponent
    ]
})
export class CdkAvisoAutocompleteModule {
}
