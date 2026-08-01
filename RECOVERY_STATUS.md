# Recovery status

This private repository is a recovery snapshot for the OHD field-survey test application.

## Safely recovered source files

- `src/App.tsx`
- `src/index.css`
- `src/types.ts`
- `src/components/BasicInfoSection.tsx`
- `src/components/OverviewSection.tsx`
- `src/components/StructuresSection.tsx`
- `src/components/BuildingInfoSection.tsx`
- `src/components/Header.tsx`

## Not yet recovered

- `src/components/ReportPreviewModal.tsx`
- Supporting project files (`package.json`, `main.tsx`, Vite configuration, and other original components)

The original AI Studio project could not be exported reliably and currently has a startup/runtime failure. This snapshot must not be treated as a runnable deployment until the remaining files are recovered and a local build succeeds.

## Safety

- The original production app is not modified.
- This repository is private.
- Changes should be made in branches and tested locally before publishing to AI Studio.
