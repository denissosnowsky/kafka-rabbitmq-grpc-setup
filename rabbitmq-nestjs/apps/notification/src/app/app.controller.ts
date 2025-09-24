import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  sendOrderCreatedEmail(@Payload() order: any) {
    console.log('[Notification Service] Order created', order);
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceedEmail(@Payload() order: any) {
    console.log('[Notification Service] Payment succeeded', order);
  }
}
