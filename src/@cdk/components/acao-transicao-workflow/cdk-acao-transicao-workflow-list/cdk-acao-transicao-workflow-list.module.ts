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
import {CdkAcaoTransicaoWorkflowListComponent} from './cdk-acao-transicao-workflow-list.component';
import {CdkAcaoTransicaoWorkflowListItemComponent} from './cdk-acao-transicao-workflow-list-item/cdk-acao-transicao-workflow-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        CdkAcaoTransicaoWorkflowListComponent,
        CdkAcaoTransicaoWorkflowListItemComponent
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
        LoginService
    ],
    exports: [
        CdkAcaoTransicaoWorkflowListComponent
    ]
})
export class CdkAcaoTransicaoWorkflowListModule {
}
