import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {VolumeEditComponent} from './volume-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkVolumeFormModule} from '@cdk/components/volume/cdk-volume-form/cdk-volume-form.module';
import {VolumeEditStoreModule} from './store/store.module';
import {VolumeService} from '@cdk/services/volume.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':volumeHandle',
        component: VolumeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VolumeEditComponent
    ],
    imports: [

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

        CdkVolumeFormModule,

        VolumeEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VolumeService,
        fromGuards.ResolveGuard
    ]
})
export class VolumeEditModule {
}
