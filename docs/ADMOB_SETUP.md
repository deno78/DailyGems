# Google AdMob 設定ガイド

## 概要

DailyGems アプリは Google AdMob を使用して広告表示機能を提供しています。このドキュメントでは、AdMob の設定方法と必要な環境変数について説明します。

## 必要な設定項目

### 1. 環境変数

以下の環境変数をリポジトリまたはビルド環境で設定する必要があります：

| 変数名 | 必須 | 説明 | 例 |
|--------|------|------|-----|
| `ADMOB_APP_ID` | ✅ | AdMob アプリケーション ID | `ca-app-pub-3940256099942544~3347511713` |
| `ADMOB_BANNER_ID` | ❌ | バナー広告ユニット ID | `ca-app-pub-3940256099942544/6300978111` |
| `ADMOB_INTERSTITIAL_ID` | ❌ | インターステーシャル広告ユニット ID | `ca-app-pub-3940256099942544/1033173712` |
| `ADMOB_REWARDED_ID` | ❌ | リワード広告ユニット ID | `ca-app-pub-3940256099942544/5224354917` |

### 2. 設定場所

#### GitHub Actions (推奨)

1. リポジトリの Settings > Secrets and variables > Actions に移動
2. "New repository secret" をクリック
3. 各環境変数を追加

#### ローカル開発環境

`android/gradle.properties` ファイルに追加：

```properties
# AdMob Configuration
ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
```

## AdMob セットアップ手順

### 1. Google AdMob アカウント作成

1. [Google AdMob](https://admob.google.com/) にアクセス
2. Google アカウントでログイン
3. "はじめに" をクリックしてアカウントを作成

### 2. アプリケーション登録

1. AdMob コンソールで "アプリ" > "アプリを追加" をクリック
2. "アプリは既に公開されていますか？" で "いいえ" を選択
3. アプリ名: `DailyGems`
4. プラットフォーム: `Android`
5. アプリケーション ID をコピーして保存

### 3. 広告ユニット作成

#### バナー広告ユニット
1. 作成したアプリを選択
2. "広告ユニット" > "広告ユニットを追加" をクリック
3. "バナー" を選択
4. 広告ユニット名: `Home Banner`
5. 広告ユニット ID をコピーして保存

#### インターステーシャル広告ユニット（オプション）
1. "広告ユニット" > "広告ユニットを追加" をクリック
2. "インターステーシャル" を選択
3. 広告ユニット名: `Interstitial Ad`
4. 広告ユニット ID をコピーして保存

#### リワード広告ユニット（オプション）
1. "広告ユニット" > "広告ユニットを追加" をクリック
2. "リワード" を選択
3. 広告ユニット名: `Reward Ad`
4. 広告ユニット ID をコピーして保存

## ファイル構成

AdMob 関連のファイルとその役割：

```
src/
├── app/
│   └── services/
│       └── admob.service.ts          # AdMob サービス
├── environments/
│   ├── environment.ts                # 開発環境設定（テスト広告 ID）
│   └── environment.prod.ts           # 本番環境設定
android/
├── app/
│   ├── build.gradle                  # AdMob 依存関係
│   └── src/main/AndroidManifest.xml  # AdMob アプリ ID 設定
└── variables.gradle                  # 環境変数読み込み
```

## テスト環境での確認

開発中は自動的にテスト広告が表示されます：

- テスト アプリ ID: `ca-app-pub-3940256099942544~3347511713`
- テスト バナー ID: `ca-app-pub-3940256099942544/6300978111`
- テスト インターステーシャル ID: `ca-app-pub-3940256099942544/1033173712`
- テスト リワード ID: `ca-app-pub-3940256099942544/5224354917`

## 本番環境での設定

1. `src/environments/environment.prod.ts` で `testMode: false` に設定
2. 実際の AdMob ID を環境変数で設定
3. リリースビルドを実行

## トラブルシューティング

### よくある問題

1. **広告が表示されない**
   - AdMob ID が正しく設定されているか確認
   - インターネット接続を確認
   - ログを確認（`adb logcat` または Chrome DevTools）

2. **"Ad failed to load" エラー**
   - 広告ユニット ID が正しいか確認
   - AdMob アカウントが有効か確認
   - 時間をおいて再試行

3. **テスト広告しか表示されない**
   - `environment.prod.ts` の `testMode` を `false` に設定
   - 実際の広告ユニット ID を環境変数で設定

### ログ確認方法

Android Studio または adb コマンドでログを確認：

```bash
adb logcat | grep -i admob
```

## セキュリティ注意事項

- AdMob ID は機密情報として扱ってください
- 公開リポジトリでは環境変数を使用し、直接コードに記載しないでください
- テスト広告 ID を本番環境で使用しないでください

## サポート

AdMob に関する詳細情報：
- [Google AdMob ヘルプセンター](https://support.google.com/admob/)
- [Capacitor AdMob プラグインドキュメント](https://github.com/capacitor-community/admob)