import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkAssuntoAutocompleteComponent} from './cdk-assunto-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssuntoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AssuntoService,
    ],
    exports: [
        CdkAssuntoAutocompleteComponent
    ]
})
export class CdkAssuntoAutocompleteModule {
}
