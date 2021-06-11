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
import {CdkAcaoListComponent} from './cdk-acao-list.component';
import {CdkAcaoListItemComponent} from './cdk-acao-list-item/cdk-acao-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkAcaoListComponent,
        CdkAcaoListItemComponent
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
        CdkAcaoListComponent
    ]
})
export class CdkAcaoListModule {
}
