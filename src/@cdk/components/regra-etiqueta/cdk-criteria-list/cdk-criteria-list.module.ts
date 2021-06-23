import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSortModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCriteriaListComponent} from './cdk-criteria-list.component';
import {CdkCriteriaListItemComponent} from './cdk-criteria-list-item/cdk-criteria-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkCriteriaListComponent,
        CdkCriteriaListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatRippleModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
        ProcessoService,
        LoginService
    ],
    exports: [
        CdkCriteriaListComponent
    ]
})
export class CdkCriteriaListModule {
}
