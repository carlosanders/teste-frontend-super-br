import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateAutocompleteComponent} from './cdk-template-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTemplateAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TemplateService,
    ],
    exports: [
        CdkTemplateAutocompleteComponent
    ]
})
export class CdkTemplateAutocompleteModule {
}
