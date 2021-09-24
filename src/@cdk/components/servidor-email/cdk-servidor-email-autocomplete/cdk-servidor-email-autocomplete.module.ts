import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkServidorEmailAutocompleteComponent} from './cdk-servidor-email-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ServidorEmailService} from '../../../services/servidor-email.service';

@NgModule({
    declarations: [
        CdkServidorEmailAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ServidorEmailService,
    ],
    exports: [
        CdkServidorEmailAutocompleteComponent
    ]
})
export class CdkServidorEmailAutocompleteModule {
}
