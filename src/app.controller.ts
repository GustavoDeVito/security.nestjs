import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './guards/throttler-behind-proxy.guard';

// @SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('default')
  default() {
    return 'Default configuration for Rate limiting and duration.';
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle(3, 60)
  @Get('override')
  override() {
    return 'Override default configuration for Rate limiting and duration.';
  }

  // Rate limiting is applied to this route.
  @SkipThrottle(false)
  @Get('dontSkip')
  dontSkip() {
    return 'Rate limiting is applied to this route.';
  }

  // This route will skip rate limiting.
  @Get('doSkip')
  doSkip() {
    return 'This route will skip rate limiting.';
  }

  // This route get ip
  @UseGuards(ThrottlerBehindProxyGuard)
  @Get('proxy')
  proxy(@Req() req: any) {
    return {
      ips: req.ips,
      ip: req.ip,
    };
  }

  @Get('helmet')
  helmet() {
    return 'View Headers.';
  }
}
