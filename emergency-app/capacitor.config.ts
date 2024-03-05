import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EmergencyApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId:"759438804028-194qkg31p70sc5pekahve1ubqc4jp6lu.apps.googleusercontent.com",
      forceCodeForRefreshToken:true
    }
  }
};

export default config;
