import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'rating-input',
    templateUrl: './rating-input.component.html',
    styleUrls: ['./rating-input.component.scss']
})
export class RatingInputComponent implements OnInit {

    @Input()
    initialRate: number = 0;

    @Input()
    quantity: number = 5;

    @Input()
    stars: boolean[] = Array(this.quantity).fill(false);

    @Input()
    control: AbstractControl;

    @Input()
    readonly: boolean = false;

    ngOnInit(): void {
        if (this.initialRate) {
            this.initialize(this.initialRate);
        }
    }

    rate(rating: number): void {
        if (!this.readonly) {
            this.stars = this.stars.map((_, i) => rating > i);
        }
    }

    initialize(init: number): void {
        this.stars = this.stars.map((_, i) => init > i);
    }
}
