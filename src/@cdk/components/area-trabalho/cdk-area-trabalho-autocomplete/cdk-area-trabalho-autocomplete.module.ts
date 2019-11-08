import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
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

        FuseSharedModule,
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
