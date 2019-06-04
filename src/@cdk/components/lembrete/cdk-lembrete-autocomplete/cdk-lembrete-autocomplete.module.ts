import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteAutocompleteComponent} from './cdk-lembrete-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkLembreteAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        LembreteService,
    ],
    exports: [
        CdkLembreteAutocompleteComponent
    ]
})
export class CdkLembreteAutocompleteModule {
}
