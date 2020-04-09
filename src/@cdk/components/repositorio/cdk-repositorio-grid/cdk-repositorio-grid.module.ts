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
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridComponent} from './cdk-repositorio-grid.component';
import {CdkRepositorioAutocompleteModule} from '@cdk/components/repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';
import {CdkRepositorioFilterModule} from '../sidebars/cdk-repositorio-filter/cdk-repositorio-filter.module';
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
        CdkRepositorioFilterModule,

        PipesModule,

        CdkSharedModule,
        CdkSidebarModule,
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
