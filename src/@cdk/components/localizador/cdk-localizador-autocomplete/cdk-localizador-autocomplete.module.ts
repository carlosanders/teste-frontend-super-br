import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorAutocompleteComponent} from './cdk-localizador-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkLocalizadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        LocalizadorService,
    ],
    exports: [
        CdkLocalizadorAutocompleteComponent
    ]
})
export class CdkLocalizadorAutocompleteModule {
}
