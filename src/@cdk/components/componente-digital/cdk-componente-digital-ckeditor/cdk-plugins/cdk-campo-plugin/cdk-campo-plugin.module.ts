import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkCampoPluginComponent} from './cdk-campo-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';
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

        FuseSharedModule,
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
