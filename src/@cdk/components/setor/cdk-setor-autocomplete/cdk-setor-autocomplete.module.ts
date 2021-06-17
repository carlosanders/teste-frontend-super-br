import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorAutocompleteComponent} from './cdk-setor-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkSetorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorAutocompleteComponent
    ]
})
export class CdkSetorAutocompleteModule {
}
