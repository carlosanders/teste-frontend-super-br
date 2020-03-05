import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVisibilidadePluginComponent} from './cdk-visibilidade-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkVisibilidadePluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        CdkSharedModule,
    ],
    entryComponents: [
        CdkVisibilidadePluginComponent
    ],
    exports: [
        CdkVisibilidadePluginComponent
    ]
})
export class CdkVisibilidadePluginModule {
}
