import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MunicipioService } from '@cdk/services/municipio.service';
import { CdkMunicipioGridsearchComponent } from './cdk-municipio-gridsearch.component';
import { CdkMunicipioGridModule } from '@cdk/components/municipio/cdk-municipio-grid/cdk-municipio-grid.module';

@NgModule({
    declarations: [
        CdkMunicipioGridsearchComponent
    ],
    imports: [

        CdkMunicipioGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        MunicipioService
    ],
    exports: [
        CdkMunicipioGridsearchComponent
    ]
})
export class CdkMunicipioGridsearchModule {
}
