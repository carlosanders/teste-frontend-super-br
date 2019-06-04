import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridComponent} from './cdk-repositorio-grid.component';
import {CdkRepositorioAutocompleteModule} from '@cdk/components/repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';
import {CdkRepositorioGridFilterModule} from './cdk-repositorio-grid-filter/cdk-repositorio-grid-filter.module';

@NgModule({
    declarations: [
        CdkRepositorioGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkRepositorioAutocompleteModule,
        FuseSharedModule,
        CdkRepositorioGridFilterModule
    ],
    providers: [
        RepositorioService,
    ],
    exports: [
        CdkRepositorioGridComponent
    ]
})
export class CdkRepositorioGridModule {
}
