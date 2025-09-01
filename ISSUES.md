### Build Failure Description
The build failed in the GitHub Actions job [#49314002607](https://github.com/deno78/DailyGems/actions/runs/17373323592/job/49314002607) due to a missing file:

- **File**: `android/app/google-services.json`

### Solution
Place your actual Firebase `google-services.json` in `android/app/` (see `google-services.json.example` for template).