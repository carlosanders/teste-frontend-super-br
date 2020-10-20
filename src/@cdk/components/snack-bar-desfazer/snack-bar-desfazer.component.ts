import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {cdkAnimations} from '../../animations';

@Component({
    selector: 'app-snack-bar-desfazer',
    templateUrl: './snack-bar-desfazer.component.html',
    styleUrls: ['./snack-bar-desfazer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SnackBarDesfazerComponent implements OnInit {


    constructor(
        private snackBarDesfazer: MatSnackBarRef<SnackBarDesfazerComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
    }

    desfazer(): void {
        this.snackBarDesfazer.dismissWithAction();
    }

    ngOnInit(): void {

    }
}

