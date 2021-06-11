import {NgModule} from '@angular/core';
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
import {VolumeListComponent} from './volume-list.component';
import {VolumeService} from '@cdk/services/volume.service';
import {RouterModule, Routes} from '@angular/router';
import {VolumeListStoreModule} from 'app/main/apps/processo/processo-edit/volumes/volume-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/volumes/volume-list/store/guards';
import {CdkVolumeGridModule} from '@cdk/components/volume/cdk-volume-grid/cdk-volume-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: VolumeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/volumes/volume-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VolumeListComponent
    ],
    imports: [
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

        CdkVolumeGridModule,

        VolumeListStoreModule,
    ],
    providers: [
        VolumeService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VolumeListComponent
    ]
})
export class VolumeListModule {
}
