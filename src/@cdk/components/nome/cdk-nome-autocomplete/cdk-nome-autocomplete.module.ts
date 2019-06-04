import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeAutocompleteComponent} from './cdk-nome-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkNomeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        NomeService,
    ],
    exports: [
        CdkNomeAutocompleteComponent
    ]
})
export class CdkNomeAutocompleteModule {
}
