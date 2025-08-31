### Issue Description

During the Android build, an error occurred: **'invalid source release: 21'**. This issue is related to the Java version specified in the project's build configuration.

### Proposed Solution

To resolve this error, it is recommended to update the `compileOptions` in the module's `build.gradle` file. Specifically, change the Java version from `JavaVersion.VERSION_21` to `JavaVersion.VERSION_17`.

### Instructions to Update `compileOptions`
1. Open the `android/app/build.gradle` file.
2. Locate the `compileOptions` section. It should look something like this:
   ```groovy
   compileOptions {
       sourceCompatibility JavaVersion.VERSION_21
       targetCompatibility JavaVersion.VERSION_21
   }
   ```
3. Update the `sourceCompatibility` and `targetCompatibility` to `JavaVersion.VERSION_17`:
   ```groovy
   compileOptions {
       sourceCompatibility JavaVersion.VERSION_17
       targetCompatibility JavaVersion.VERSION_17
   }
   ```
4. Save the changes.

### Additional Context

For reference, you can also check the top-level `build.gradle` file (ref: `00648cc850a6f281730e6943f232f7921f31b547`) for any additional configuration that may affect the build process.