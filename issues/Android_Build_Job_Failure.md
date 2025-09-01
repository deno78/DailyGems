## Issue: Android Build Job Failure

### Description:
The Android build job is failing due to an invalid Java source release version (21) set in Gradle, which is unsupported in the current GitHub Actions runner.

### Recommendation:
Please update the Gradle configuration to use `JavaVersion.VERSION_17` for both `sourceCompatibility` and `targetCompatibility`. This change will ensure compatibility with the current GitHub Actions runner.

### Job Log:
For more details, refer to the job log: [Job Log](https://github.com/deno78/DailyGems/actions/runs/17364650304/job/49289589718) (ref: ed0fb0eb4410ed0c7ae4deb7b0a8d2e42a2935bb).
