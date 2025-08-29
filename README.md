# DailyGems
日々習慣化アプリ - Progressive Web App (PWA)

## 概要
DailyGemsは、日々の習慣化をサポートするIonic Angular PWAアプリです。
毎日の小さな習慣を積み重ねて、より良い自分を目指すためのアプリケーションです。

## 技術スタック
- **Ionic 8** with Angular 19
- **Progressive Web App (PWA)** 対応
- **Angular Service Worker** でオフライン対応
- **TypeScript** & **SCSS**
- **GitHub Pages** で自動デプロイ
- **Capacitor** でネイティブAndroidアプリ対応

## 開発

### 必要な環境
- Node.js 20以上
- npm

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# ブラウザで http://localhost:4200 にアクセス
```

### ビルド
```bash
# 本番用ビルド
npm run build

# GitHub Pages用ビルド
npm run build -- --configuration=github-pages

# Android用ビルド（Web→Capacitor sync）
npm run cap:build:android
```

### Android開発
```bash
# Capacitorプラットフォーム同期
npm run cap:sync:android

# Android Studioでプロジェクトを開く
npm run cap:open:android
```

## デプロイ
このアプリは GitHub Actions を使用して自動的に GitHub Pages にデプロイされます。

- `main` ブランチにプッシュすると自動デプロイが実行されます
- プルリクエストでは Build テストのみが実行されます
- デプロイされたアプリは https://deno78.github.io/DailyGems/ でアクセス可能です

### GitHub Actions ワークフロー
- `deploy.yml`: main ブランチへの push 時に GitHub Pages へのデプロイを実行
- `test.yml`: プルリクエスト時にビルドテストを実行
- `android-build.yml`: Android APK/AAB ファイルのビルドを実行

## Android アプリ
このプロジェクトは Capacitor を使用してネイティブ Android アプリとしてもビルドできます。

### Android ビルド
GitHub Actions を使用して自動的に Android APK/AAB ファイルをビルドできます：

1. **手動トリガー**: GitHub Actions の「Build Android APK/AAB」ワークフローを手動実行
   - ビルドタイプ: `debug` または `release`
   - 出力形式: `apk` または `aab`

2. **自動トリガー**: 以下のファイルが変更された場合に自動実行
   - `src/**`（ソースコード）
   - `android/**`（Androidプロジェクト）
   - `package.json`、`angular.json`、`capacitor.config.ts`

### ローカル Android 開発
```bash
# 必要な環境: Android Studio, Android SDK, Java 17+

# Web アプリをビルドして Android プロジェクトに同期
npm run cap:build:android

# Android Studio でプロジェクトを開く
npm run cap:open:android

# または直接 Gradle でビルド
cd android
./gradlew assembleDebug  # デバッグ APK
./gradlew assembleRelease  # リリース APK
./gradlew bundleRelease  # リリース AAB
```

## Google AdMob 広告対応

このアプリは Google AdMob 広告に対応しており、Android アプリでバナー広告を表示できます。

### AdMob 設定に必要な環境変数

以下の環境変数をリポジトリの Secrets または環境設定で設定してください：

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `ADMOB_APP_ID` | AdMob アプリケーション ID | `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX` |
| `ADMOB_BANNER_ID` | バナー広告ユニット ID | `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX` |
| `ADMOB_INTERSTITIAL_ID` | インターステーシャル広告ユニット ID | `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX` |
| `ADMOB_REWARDED_ID` | リワード広告ユニット ID | `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX` |

### AdMob セットアップ手順

1. **Google AdMob アカウント作成**
   - [Google AdMob](https://admob.google.com/) でアカウントを作成
   - 新しいアプリを登録し、アプリケーション ID を取得

2. **広告ユニット作成**
   - バナー、インターステーシャル、リワード広告ユニットを作成
   - 各広告ユニット ID を記録

3. **環境変数設定**
   - GitHub リポジトリの Settings > Secrets and variables > Actions で環境変数を設定
   - または、android/gradle.properties に以下の形式で設定：
   ```properties
   ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
   ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
   ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
   ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
   ```

4. **本番ビルド**
   - 本番環境では `src/environments/environment.prod.ts` の `testMode` を `false` に設定
   - リリースビルド時に実際の AdMob ID が使用されます

### テスト環境での動作確認

- 開発環境では自動的にテスト広告が表示されます
- テスト広告 ID が environment.ts で設定済みです
- 実際の広告表示前にテスト環境で動作確認を行ってください

### 注意事項

- 本番環境では必ず実際の AdMob ID を使用してください
- テスト広告 ID を本番で使用すると AdMob アカウントが停止される可能性があります
- 広告の表示は Android アプリでのみ動作します（PWA では動作しません）

## PWA機能
- オフラインでの動作
- ホーム画面へのインストール
- プッシュ通知対応（今後の機能）
- バックグラウンド同期（今後の機能）

## ライセンス
MIT License