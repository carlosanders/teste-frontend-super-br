import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfigModuloGridsearchComponent} from './cdk-config-modulo-gridsearch.component';
import {CdkConfigModuloGridModule} from '../../cdk-config-modulo-grid/cdk-config-modulo-grid.module';
import {ConfigModuloService} from '../../../../services/config-modulo.service';

@NgModule({
    declarations: [
        CdkConfigModuloGridsearchComponent
    ],
    imports: [
        CdkConfigModuloGridModule,

        CdkSharedModule,
    ],
    providers: [
        ConfigModuloService
    ],
    exports: [
        CdkConfigModuloGridsearchComponent
    ]
})
export class CdkConfigModuloGridsearchModule {
}
