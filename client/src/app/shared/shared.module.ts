import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [NotificationComponent, HeaderComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [NotificationComponent, HeaderComponent],
})
export class SharedModule {}
