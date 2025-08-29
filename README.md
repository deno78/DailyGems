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

## PWA機能
- オフラインでの動作
- ホーム画面へのインストール
- プッシュ通知対応（今後の機能）
- バックグラウンド同期（今後の機能）

## ライセンス
MIT License