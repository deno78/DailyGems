import { Injectable } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobBannerSize } from '@capacitor-community/admob';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  private isInitialized = false;
  private config = environment.admob;

  constructor(private platform: Platform) {}

  async initialize(): Promise<void> {
    if (this.isInitialized || !this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.initialize({
        testingDevices: this.config.testMode ? ['YOUR_DEVICE_ID'] : [],
        initializeForTesting: this.config.testMode
      });
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Error initializing AdMob:', error);
    }
  }

  async showBannerAd(): Promise<void> {
    if (!this.isInitialized || !this.platform.is('capacitor')) {
      console.log('AdMob not initialized or not on mobile platform');
      return;
    }

    try {
      const options: BannerAdOptions = {
        adId: this.config.adUnitIds.banner,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: this.config.testMode
      };

      await AdMob.showBanner(options);
      console.log('Banner ad shown successfully');
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }

  async hideBannerAd(): Promise<void> {
    if (!this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden successfully');
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }

  async removeBannerAd(): Promise<void> {
    if (!this.platform.is('capacitor')) {
      return;
    }

    try {
      await AdMob.removeBanner();
      console.log('Banner ad removed successfully');
    } catch (error) {
      console.error('Error removing banner ad:', error);
    }
  }

  // Method to update configuration at runtime
  updateConfig(newConfig: Partial<typeof environment.admob>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig() {
    return { ...this.config };
  }

  isAdMobInitialized(): boolean {
    return this.isInitialized;
  }
}