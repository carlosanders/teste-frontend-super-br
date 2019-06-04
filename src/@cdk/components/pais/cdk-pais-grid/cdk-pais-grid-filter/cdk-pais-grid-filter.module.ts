import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { PaisService } from '@cdk/services/pais.service';
import { CdkPaisGridFilterComponent } from './cdk-pais-grid-filter.component';

@NgModule({
    declarations: [
        CdkPaisGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        PaisService,
    ],
    exports: [
        CdkPaisGridFilterComponent
    ]
})
export class CdkPaisGridFilterModule {
}
