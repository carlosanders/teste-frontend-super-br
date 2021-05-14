import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class Notification {
    module: any;
    order: number;
    config: MatSnackBarConfig;

    constructor() {
        this.module = null;
        this.order = null;
        this.config = null;
    }
}
