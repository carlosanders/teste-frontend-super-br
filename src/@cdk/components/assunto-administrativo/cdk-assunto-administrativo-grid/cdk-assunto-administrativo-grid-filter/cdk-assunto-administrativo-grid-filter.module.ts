import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import { CdkAssuntoAdministrativoGridFilterComponent } from './cdk-assunto-administrativo-grid-filter.component';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoAdministrativoGridFilterComponent
    ]
})
export class CdkAssuntoAdministrativoGridFilterModule {
}
