import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigModuloListComponent} from './config-modulo-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {modulesConfig} from 'modules/modules-config';
import {ConfigModuloService} from '../../../../../../@cdk/services/config-modulo.service';
import {
    CdkConfigModuloGridModule
} from '../../../../../../@cdk/components/config-modulo/cdk-config-modulo-grid/cdk-config-modulo-grid.module';
import {ConfigModuleListStoreModule} from './store/store.module';
import {ModuloService} from '../../../../../../@cdk/services/modulo.service';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {BreadcrumbsModule} from '../../../../../../@cdk/components/breadcrumbs/breadcrumbs.module';

const routes: Routes = [
    {
        path: '',
        component: ConfigModuloListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/config-modulo/config-modulo-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ConfigModuloListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatepickerModule,
        MatDialogModule,
        BreadcrumbsModule,
        CdkConfigModuloGridModule,
        ConfigModuleListStoreModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ConfigModuloService,
        ModuloService
    ]
})
export class ConfigModuloListModule {
}
