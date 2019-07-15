import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkCampoPluginComponent} from './cdk-campo-plugin.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {CampoService} from '@cdk/services/campo.service';
import {CdkCampoAutocompleteModule} from '../../../../campo/cdk-campo-autocomplete/cdk-campo-autocomplete.module';

@NgModule({
    declarations: [
        CdkCampoPluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        CdkCampoAutocompleteModule,

        FuseSharedModule,
    ],
    entryComponents: [
        CdkCampoPluginComponent
    ],
    providers: [
        CampoService
    ],
    exports: [
        CdkCampoPluginComponent
    ]
})
export class CdkCampoPluginModule {
}
