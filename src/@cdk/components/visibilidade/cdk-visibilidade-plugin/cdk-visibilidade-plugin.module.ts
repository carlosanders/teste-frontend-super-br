import {NgModule} from '@angular/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkVisibilidadePluginComponent} from './cdk-visibilidade-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';

@NgModule({
    declarations: [
        CdkVisibilidadePluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        FuseSharedModule,
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
