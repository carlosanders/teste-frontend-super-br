import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'app-snack-bar-delete',
    templateUrl: './snack-bar-delete.component.html',
    styleUrls: ['./snack-bar-delete.component.scss']
})
export class SnackBarDeleteComponent implements OnInit {


    constructor(
        private snackBarDelete: MatSnackBarRef<SnackBarDeleteComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
    }

    desfazer(): void {
        this.snackBarDelete.dismissWithAction();
    }

    ngOnInit(): void {

    }
}

