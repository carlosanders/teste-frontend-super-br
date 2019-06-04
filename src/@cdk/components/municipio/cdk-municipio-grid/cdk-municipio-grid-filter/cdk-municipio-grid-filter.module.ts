import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MunicipioService } from '@cdk/services/municipio.service';
import { CdkMunicipioGridFilterComponent } from './cdk-municipio-grid-filter.component';

@NgModule({
    declarations: [
        CdkMunicipioGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkMunicipioGridFilterComponent
    ]
})
export class CdkMunicipioGridFilterModule {
}
