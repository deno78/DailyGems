# Firebase Setup Guide for DailyGems

This guide explains how to set up Firebase for push notifications and other Google Services features in the DailyGems Android app.

## Prerequisites

- Access to [Firebase Console](https://console.firebase.google.com/)
- Android project already built with Capacitor

## 日本語での回答 (Answer in Japanese)

**質問**: Google-Service.jsonに記載する情報で、Variableに持つべきものがあれば提示して。Firebase側の設定方法も併せて調べて

**回答**: 
google-services.json ファイルの中で環境変数として管理すべき情報は以下の通りです：

### 環境変数として管理可能な情報

| フィールド | 環境変数名 | 用途 | 機密度 |
|-----------|------------|------|--------|
| `project_info.project_number` | `FIREBASE_PROJECT_NUMBER` | Firebase プロジェクト番号 | 中 |
| `project_info.project_id` | `FIREBASE_PROJECT_ID` | Firebase プロジェクト ID | 低 |
| `client_info.mobilesdk_app_id` | `FIREBASE_APP_ID` | Firebase アプリ ID | 中 |
| `oauth_client.client_id` | `FIREBASE_CLIENT_ID` | OAuth クライアント ID | 高 |
| `api_key.current_key` | `FIREBASE_API_KEY` | Firebase API キー | 高 |

### 推奨方法
ファイル全体を `GOOGLE_SERVICES_JSON` シークレットとして保存することを推奨します。これにより、設定が簡単で安全性も高くなります。

### Firebase 側の設定手順
1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. プロジェクトを作成またはナビゲート
3. Android アプリを追加（パッケージ名: `com.example.dailygems`）
4. `google-services.json` ファイルをダウンロード
5. GitHub リポジトリの Settings > Secrets で `GOOGLE_SERVICES_JSON` シークレットとしてファイル内容を保存

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enter project name: `DailyGems` (or your preferred name)
4. Follow the setup wizard

### 2. Add Android App to Firebase Project

1. In Firebase Console, click "Add app" and select Android
2. Enter package name: `com.example.dailygems` (must match `applicationId` in `android/app/build.gradle`)
3. Enter app nickname: `DailyGems Android`
4. Leave SHA-1 certificate empty for now (can be added later for release builds)
5. Click "Register app"

### 3. Download Configuration File

1. Download the `google-services.json` file from Firebase Console
2. **Important**: Do NOT commit this file to version control as it contains sensitive information
3. Place the file in: `android/app/google-services.json`

```bash
# Correct location:
android/
  app/
    google-services.json  ← Place file here
    build.gradle
    ...
```

### 4. Verify Setup

The project is already configured to automatically detect the `google-services.json` file:

- ✅ Google Services plugin classpath is configured in `android/build.gradle`
- ✅ Plugin is conditionally applied in `android/app/build.gradle`
- ✅ File is automatically excluded from version control via `.gitignore`

When you build the project:
- **With** `google-services.json`: Firebase features work, push notifications enabled
- **Without** `google-services.json`: App builds successfully but Firebase features disabled

### 5. Enable Firebase Services

In Firebase Console, enable the services you need:

#### For Push Notifications:
1. Go to "Cloud Messaging" in Firebase Console
2. No additional setup required - it's enabled by default

#### For Analytics (optional):
1. Go to "Analytics" in Firebase Console
2. Follow setup instructions

### 6. Test Configuration

Build the Android app to verify setup:

```bash
cd android
./gradlew assembleDebug
```

Check the build logs for confirmation messages:
- ✅ "google-services.json found, applying Google Services plugin for Firebase/Push Notifications"
- ❌ "google-services.json not found. Firebase/Push Notifications will not work."

## Troubleshooting

### Common Issues

1. **Build fails with Google Services errors**
   - Ensure `google-services.json` is in the correct location: `android/app/`
   - Verify package name in file matches `applicationId` in `build.gradle`

2. **Push notifications not working**
   - Verify `google-services.json` is present and valid
   - Check that Cloud Messaging is enabled in Firebase Console
   - Ensure device has Google Play Services

3. **File accidentally committed to Git**
   ```bash
   git rm android/app/google-services.json
   git commit -m "Remove google-services.json from version control"
   ```

### Example Template

A template file is provided at `android/app/google-services.json.example` showing the expected structure with placeholder values.

## Security Notes

- ⚠️ **Never commit `google-services.json` to version control**
- ⚠️ The file contains API keys and project identifiers
- ✅ Use environment variables or secure secrets management for CI/CD
- ✅ Different files for development/staging/production environments

## CI/CD Setup

For automated builds, store the `google-services.json` content as a GitHub Secret:

1. Go to Repository Settings > Secrets and variables > Actions
2. Add secret named `GOOGLE_SERVICES_JSON` with file content
3. The workflow automatically creates the file before build if the secret exists

> **Note**: The GitHub Actions workflow in `.github/workflows/android-build.yml` has been updated to automatically create `google-services.json` from the `GOOGLE_SERVICES_JSON` secret if it exists. No additional workflow configuration is needed.

### Environment Variables for google-services.json

While storing the entire file as a secret is recommended, individual fields that could be stored as environment variables include:

| Field | Environment Variable | Purpose | Sensitivity |
|-------|---------------------|---------|-------------|
| `project_info.project_number` | `FIREBASE_PROJECT_NUMBER` | Firebase project identifier | Medium |
| `project_info.project_id` | `FIREBASE_PROJECT_ID` | Firebase project ID | Low |
| `client_info.mobilesdk_app_id` | `FIREBASE_APP_ID` | Firebase app identifier | Medium |
| `oauth_client.client_id` | `FIREBASE_CLIENT_ID` | OAuth client ID | High |
| `api_key.current_key` | `FIREBASE_API_KEY` | Firebase API key | High |

**Recommendation**: Use the complete file approach (`GOOGLE_SERVICES_JSON` secret) for simplicity and security.

### Alternative: Individual Environment Variables

If you prefer to store individual values as environment variables, you would need to create a script to generate the `google-services.json` file from these variables. However, this approach is more complex and error-prone.

```bash
# Example script to generate google-services.json from environment variables
cat > android/app/google-services.json << EOF
{
  "project_info": {
    "project_number": "${FIREBASE_PROJECT_NUMBER}",
    "project_id": "${FIREBASE_PROJECT_ID}",
    "storage_bucket": "${FIREBASE_PROJECT_ID}.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "${FIREBASE_APP_ID}",
        "android_client_info": {
          "package_name": "com.example.dailygems"
        }
      },
      "oauth_client": [
        {
          "client_id": "${FIREBASE_CLIENT_ID}",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "${FIREBASE_API_KEY}"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "${FIREBASE_CLIENT_ID}",
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
}
EOF
```

## Related Files

- `android/build.gradle` - Google Services classpath configuration
- `android/app/build.gradle` - Plugin application and dependency
- `android/app/google-services.json.example` - Template file
- `.gitignore` - Excludes real google-services.json