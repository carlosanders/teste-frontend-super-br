import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {CdkAfastamentoAutocompleteComponent} from './cdk-afastamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAfastamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AfastamentoService,
    ],
    exports: [
        CdkAfastamentoAutocompleteComponent
    ]
})
export class CdkAfastamentoAutocompleteModule {
}
