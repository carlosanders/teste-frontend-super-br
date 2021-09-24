import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContaEmailListComponent} from './contas-email-list.component';
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
import {ContaEmailStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {ContaEmailService} from '@cdk/services/conta-email.service';
import {CdkContaEmailGridModule} from '@cdk/components/conta-email/cdk-conta-email-grid/cdk-conta-email-grid.module';

const routes: Routes = [
    {
        path: '',
        component: ContaEmailListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/contas-email/contas-email-list';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ContaEmailListComponent],
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
        ContaEmailStoreModule,
        CdkContaEmailGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard,
        ContaEmailService
    ]
})
export class ContaEmailListModule {
}
