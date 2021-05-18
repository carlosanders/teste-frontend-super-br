import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvisoListComponent} from './aviso-list.component';
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
import {AvisoStoreModule} from './store/store.module';
import {CdkAvisoGridModule} from '@cdk/components/aviso/cdk-aviso-grid/cdk-aviso-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {AvisoService} from '@cdk/services/aviso.service';

const routes: Routes = [
    {
        path: '',
        component: AvisoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/aviso/aviso-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [AvisoListComponent],
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
        AvisoStoreModule,
        CdkAvisoGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard,
        AvisoService
    ]
})
export class AvisoListModule {
}
