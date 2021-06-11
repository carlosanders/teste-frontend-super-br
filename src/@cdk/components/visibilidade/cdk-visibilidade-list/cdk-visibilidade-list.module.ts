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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVisibilidadeListComponent} from './cdk-visibilidade-list.component';
import {CdkVisibilidadeListItemComponent} from './cdk-visibilidade-list-item/cdk-visibilidade-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkVisibilidadeListComponent,
        CdkVisibilidadeListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
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
        CdkVisibilidadeListComponent
    ]
})
export class CdkVisibilidadeListModule {
}
