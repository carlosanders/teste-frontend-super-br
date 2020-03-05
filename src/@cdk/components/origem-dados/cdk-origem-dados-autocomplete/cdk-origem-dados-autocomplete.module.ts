import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {CdkOrigemDadosAutocompleteComponent} from './cdk-origem-dados-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkOrigemDadosAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        OrigemDadosService,
    ],
    exports: [
        CdkOrigemDadosAutocompleteComponent
    ]
})
export class CdkOrigemDadosAutocompleteModule {
}
