import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MunicipioService } from '@cdk/services/municipio.service';
import { CdkEnderecoGridFilterComponent } from './cdk-endereco-grid-filter.component';

@NgModule({
    declarations: [
        CdkEnderecoGridFilterComponent,
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
        CdkEnderecoGridFilterComponent
    ]
})
export class CdkEnderecoGridFilterModule {
}
