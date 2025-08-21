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
```

## デプロイ
このアプリは GitHub Actions を使用して自動的に GitHub Pages にデプロイされます。

- `main` ブランチにプッシュすると自動デプロイが実行されます
- プルリクエストでは Build テストのみが実行されます
- デプロイされたアプリは https://deno78.github.io/DailyGems/ でアクセス可能です

### GitHub Actions ワークフロー
- `deploy.yml`: main ブランチへの push 時に GitHub Pages へのデプロイを実行
- `test.yml`: プルリクエスト時にビルドテストを実行

## PWA機能
- オフラインでの動作
- ホーム画面へのインストール
- プッシュ通知対応（今後の機能）
- バックグラウンド同期（今後の機能）

## ライセンス
MIT License