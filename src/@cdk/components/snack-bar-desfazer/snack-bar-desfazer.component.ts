import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {cdkAnimations} from '../../animations';
import {interval} from 'rxjs';

@Component({
    selector: 'app-snack-bar-desfazer',
    templateUrl: './snack-bar-desfazer.component.html',
    styleUrls: ['./snack-bar-desfazer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SnackBarDesfazerComponent implements OnInit {

    progress = 100;
    curSec = 0;

    constructor(
        private snackBarDesfazer: MatSnackBarRef<SnackBarDesfazerComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    confirmar(): void {
        this.snackBarDesfazer.dismiss();
    }

    desfazer(): void {
        this.snackBarDesfazer.dismissWithAction();
    }

    startTimer(time: number): void {
        const timer$ = interval(100);

        const sub = timer$.subscribe((sec) => {
            sec *= 100;
            this.progress = 100 - (sec * 100) / time;
            this.curSec = sec;
            this._changeDetectorRef.detectChanges();

            if (this.curSec === time) {
                sub.unsubscribe();
            }
        });
    }

    ngOnInit(): void {
        this.startTimer(this.data.duration ?? 3000);
    }
}

