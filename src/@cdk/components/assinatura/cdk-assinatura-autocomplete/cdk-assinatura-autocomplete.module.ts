import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkAssinaturaAutocompleteComponent} from './cdk-assinatura-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssinaturaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AssinaturaService,
    ],
    exports: [
        CdkAssinaturaAutocompleteComponent
    ]
})
export class CdkAssinaturaAutocompleteModule {
}
