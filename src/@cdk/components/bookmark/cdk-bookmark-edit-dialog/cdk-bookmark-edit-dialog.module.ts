import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkBookmarkEditDialogComponent} from './cdk-bookmark-edit-dialog.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from "@angular/material/divider";
import {NgxUpperCaseDirectiveModule} from "ngx-upper-case-directive";

@NgModule({
    declarations: [
        CdkBookmarkEditDialogComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkSharedModule,
        MatCheckboxModule,
        MatDividerModule,
        NgxUpperCaseDirectiveModule,
    ],
    entryComponents: [
        CdkBookmarkEditDialogComponent
    ],
    exports: [
        CdkBookmarkEditDialogComponent
    ]
})
export class CdkBookmarkEditDialogModule {
}
