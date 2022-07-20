import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CronjobEditComponent} from './cronjob-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {CronjobEditStoreModule} from './store/store.module';
import {CronjobService} from '@cdk/services/cronjob.service';
import {CdkCronjobFormModule} from '@cdk/components/cronjob/cdk-cronjob-form/cdk-cronjob-form.module';
import {PathModule} from '@cdk/components/path/path.module';


const routes: Routes = [
    {
        path: ':cronjobHandle',
        component: CronjobEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [CronjobEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        CronjobEditStoreModule,
        CdkCronjobFormModule,
        PathModule

    ],
    providers: [
        fromGuards.ResolveGuard,
        CronjobService,
    ]
})
export class CronjobEditModule {
}
