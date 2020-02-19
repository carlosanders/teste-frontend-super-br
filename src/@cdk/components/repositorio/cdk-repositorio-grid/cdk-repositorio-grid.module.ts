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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridComponent} from './cdk-repositorio-grid.component';
import {CdkRepositorioAutocompleteModule} from '@cdk/components/repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';
import {CdkRepositorioGridFilterModule} from './cdk-repositorio-grid-filter/cdk-repositorio-grid-filter.module';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkRepositorioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRepositorioGridComponent,
        CdkRepositorioMainSidebarComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        CdkRepositorioAutocompleteModule,
        CdkRepositorioGridFilterModule,

        PipesModule,

        FuseSharedModule,
        FuseSidebarModule,
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
