import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@cdk/angular/material';
import {ConflitoVersaoDialogComponent} from "./conflito-versao-dialog.component";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
    {
        path: '',
        component: ConflitoVersaoDialogComponent
    }
];

@NgModule({
    declarations: [
        ConflitoVersaoDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        MatDialogModule,
        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
    ],
    exports: [
        ConflitoVersaoDialogComponent
    ]
})
export class ConflitoVersaoDialogModule {
}
