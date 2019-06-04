import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeAutocompleteComponent} from './cdk-atividade-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAtividadeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AtividadeService,
    ],
    exports: [
        CdkAtividadeAutocompleteComponent
    ]
})
export class CdkAtividadeAutocompleteModule {
}
