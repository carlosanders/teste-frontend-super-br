import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridFilterComponent} from './cdk-repositorio-grid-filter.component';

@NgModule({
    declarations: [
        CdkRepositorioGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        RepositorioService,
    ],
    exports: [
        CdkRepositorioGridFilterComponent
    ]
})
export class CdkRepositorioGridFilterModule {
}
