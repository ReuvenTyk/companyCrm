import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { boolean } from 'joi';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() headerLabel?: string;
  @Input() showNotification = false;
  @Output() buttonClicked = new EventEmitter<boolean>();

  constructor() {}

  onButtonClicked(respon: boolean) {
    this.buttonClicked.emit(respon);
  }

  ngOnInit(): void {}
}
