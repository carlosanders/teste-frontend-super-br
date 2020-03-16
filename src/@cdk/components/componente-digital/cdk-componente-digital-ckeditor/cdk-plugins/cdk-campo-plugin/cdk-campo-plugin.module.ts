import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCampoPluginComponent} from './cdk-campo-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';
import {CdkCampoAutocompleteModule} from '../../../../campo/cdk-campo-autocomplete/cdk-campo-autocomplete.module';

@NgModule({
    declarations: [
        CdkCampoPluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,
        CdkCampoAutocompleteModule,

        CdkSharedModule,
    ],
    entryComponents: [
        CdkCampoPluginComponent
    ],
    exports: [
        CdkCampoPluginComponent
    ]
})
export class CdkCampoPluginModule {
}
