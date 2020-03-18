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

import {RelevanciaEditComponent} from './relevancia-edit.component';
import {RouterModule, Routes} from '@angular/router';
// import {CdkRelevanciaFormModule} from '@cdk/components/relevancia/cdk-relevancia-form/cdk-relevancia-form.module';
import {RelevanciaEditStoreModule} from './store/store.module';
import {RelevanciaService} from '@cdk/services/relevancia.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':relevanciaHandle',
        component: RelevanciaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RelevanciaEditComponent
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

        // CdkRelevanciaFormModule,

        RelevanciaEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        RelevanciaService,
        fromGuards.ResolveGuard
    ]
})
export class RelevanciaEditModule {
}
