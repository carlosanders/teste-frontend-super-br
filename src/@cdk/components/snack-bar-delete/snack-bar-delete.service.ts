import {Injectable} from '@angular/core';
import {MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarDeleteService {

    public config: MatSnackBarConfig;

    constructor() {
        this.config = {
            duration: 5000,
            panelClass: ['fuse-white-bg']
        };

    }
}
