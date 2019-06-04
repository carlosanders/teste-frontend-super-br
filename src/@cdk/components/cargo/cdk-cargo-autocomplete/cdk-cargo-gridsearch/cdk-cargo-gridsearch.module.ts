import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { CargoService } from '@cdk/services/cargo.service';
import { CdkCargoGridsearchComponent } from './cdk-cargo-gridsearch.component';
import { CdkCargoGridModule } from '@cdk/components/cargo/cdk-cargo-grid/cdk-cargo-grid.module';

@NgModule({
    declarations: [
        CdkCargoGridsearchComponent
    ],
    imports: [

        CdkCargoGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        CargoService
    ],
    exports: [
        CdkCargoGridsearchComponent
    ]
})
export class CdkCargoGridsearchModule {
}
