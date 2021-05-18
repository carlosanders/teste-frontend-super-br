import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { NotificationInterface } from '../notification.interface';
import { cdkAnimations } from '@cdk/animations';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { Notificacao } from '@cdk/models';

@Component({
    selector: 'app-notification-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DefaultComponent {

    constructor(
        private snackbar: MatSnackBarRef<DefaultComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: Notificacao,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    close() {
        this.snackbar.dismiss();
    }

}
