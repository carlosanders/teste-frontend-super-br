import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargoListComponent} from './cargo-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {CargoStoreModule} from './store/store.module';
import {CdkCargoGridModule} from '@cdk/components/cargo/cdk-cargo-grid/cdk-cargo-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {CargoService} from '@cdk/services/cargo.service';

const routes: Routes = [
    {
        path: '',
        component: CargoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/cargo/cargo-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [CargoListComponent],
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
        CargoStoreModule,
        CdkCargoGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard,
        CargoService
    ]
})
export class CargoListModule {
}
