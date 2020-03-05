import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVersaoPluginComponent} from './cdk-versao-plugin.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';
import {CdkVersaoGridModule} from '../../../../versao/cdk-versao-grid/cdk-versao-grid.module';
import {CdkVersaoGridsearchModule} from '../../../../versao/cdk-versao-grid/cdk-versao-gridsearch/cdk-versao-gridsearch.module';


@NgModule({
    declarations: [
        CdkVersaoPluginComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        CdkSharedModule,
        CdkVersaoGridModule,
        CdkVersaoGridsearchModule,
    ],
    entryComponents: [
        CdkVersaoPluginComponent
    ],
    exports: [
        CdkVersaoPluginComponent
    ]
})
export class CdkVersaoPluginModule {
}
