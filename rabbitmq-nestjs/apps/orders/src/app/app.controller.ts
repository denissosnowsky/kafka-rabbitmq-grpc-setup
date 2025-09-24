import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PAYMENT_CLIENT') private readonly paymentsClients: ClientProxy,
    @Inject('NOTIFICATION_CLIENT')
    private readonly notificationClients: ClientProxy
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-Service] received the order:', order);
    this.paymentsClients.emit('process-payment', order);
    this.notificationClients.emit('order-created', order);
  }
}
