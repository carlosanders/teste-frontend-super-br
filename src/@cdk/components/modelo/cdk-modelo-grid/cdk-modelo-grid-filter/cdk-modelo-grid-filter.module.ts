import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModeloService } from '@cdk/services/modelo.service';
import { CdkModeloGridFilterComponent } from './cdk-modelo-grid-filter.component';

@NgModule({
    declarations: [
        CdkModeloGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloGridFilterComponent
    ]
})
export class CdkModeloGridFilterModule {
}
