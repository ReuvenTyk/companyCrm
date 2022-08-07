import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [NotificationComponent],
})
export class SharedModule {}
