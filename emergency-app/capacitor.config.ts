import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.puiu.emergencyapp',
  appName: 'EmergencyApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId:"759438804028-s50pahkupprd4vtfl08nbm18tb3rkel4.apps.googleusercontent.com",
      androidClientId: "759438804028-194qkg31p70sc5pekahve1ubqc4jp6lu.apps.googleusercontent.com",
      forceCodeForRefreshToken:true
    },
    LocalNotifications: {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  }
};

export default config;
