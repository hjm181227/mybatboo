import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mybatboo.app',
  appName: 'mybatboo',
  webDir: 'dist/mybatboo',
  bundledWebRuntime: false,
  // server: {
  //   url: 'http://15.164.23.13:8080',
  //   hostname: ''
  // }
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
