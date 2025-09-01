## Update Android Build Configuration to Use Java 11

Update the Android build configuration to use Java 11 instead of Java 21 or Java 17. 
This should include the following instructions:

1. Change the `compileOptions` in the `build.gradle` files to use Java 11:
   ```groovy
   android {
       ...
       compileOptions {
           sourceCompatibility JavaVersion.VERSION_11
           targetCompatibility JavaVersion.VERSION_11
       }
   }
   ```

2. Update the `setup-java` action in the workflow to use Java 11 for compatibility:
   ```yaml
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Set up JDK 11
           uses: actions/setup-java@v1
           with:
             java-version: '11'
   ```

Please ensure that any necessary updates or testing are conducted to verify compatibility with Java 11.
