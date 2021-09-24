import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkContaEmailAutocompleteComponent} from './cdk-conta-email-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ContaEmailService} from '../../../services/conta-email.service';

@NgModule({
    declarations: [
        CdkContaEmailAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ContaEmailService,
    ],
    exports: [
        CdkContaEmailAutocompleteComponent
    ]
})
export class CdkContaEmailAutocompleteModule {
}
