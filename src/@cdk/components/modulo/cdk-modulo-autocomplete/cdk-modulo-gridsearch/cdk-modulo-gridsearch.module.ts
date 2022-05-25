import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModuloGridsearchComponent} from './cdk-modulo-gridsearch.component';
import {CdkModuloGridModule} from '../../cdk-modulo-grid/cdk-modulo-grid.module';
import {ModuloService} from '../../../../services/modulo.service';

@NgModule({
    declarations: [
        CdkModuloGridsearchComponent
    ],
    imports: [
        CdkModuloGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModuloService
    ],
    exports: [
        CdkModuloGridsearchComponent
    ]
})
export class CdkModuloGridsearchModule {
}
