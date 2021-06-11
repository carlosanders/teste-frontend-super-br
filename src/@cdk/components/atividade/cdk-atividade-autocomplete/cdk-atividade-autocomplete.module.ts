import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeAutocompleteComponent} from './cdk-atividade-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAtividadeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
