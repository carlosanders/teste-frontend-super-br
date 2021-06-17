import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AreaTrabalhoService} from '@cdk/services/area-trabalho.service';
import {CdkAreaTrabalhoAutocompleteComponent} from './cdk-area-trabalho-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AreaTrabalhoService,
    ],
    exports: [
        CdkAreaTrabalhoAutocompleteComponent
    ]
})
export class CdkAreaTrabalhoAutocompleteModule {
}
