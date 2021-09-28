import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServidorEmailListComponent} from './servidor-email-list.component';
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
import {ServidorEmailStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {CdkServidorEmailGridModule} from '@cdk/components/servidor-email/cdk-servidor-email-grid/cdk-servidor-email-grid.module';

const routes: Routes = [
    {
        path: '',
        component: ServidorEmailListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/servidor-email/servidor-email-list';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ServidorEmailListComponent],
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
        ServidorEmailStoreModule,
        CdkServidorEmailGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard,
        ServidorEmailService
    ]
})
export class ServidorEmailListModule {
}
