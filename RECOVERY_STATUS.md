# Recovery status

This private repository is a recovery snapshot and clean project reconstruction for the OHD field-survey test application.

## Recovered application files

- `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/types.ts`
- Survey sections: BasicInfo, Overview, Structures, BuildingInfo, Header
- Workflow components: ReportPreviewModal, HistoryListModal, QuickToast
- Utilities: sampleData, formatReport
- Project configuration: package.json, index.html, vite.config.ts, tsconfig.json

## Important verification status

The project files now have a standard Vite/React folder layout. A local `npm run build` has not yet been completed because this local environment cannot authenticate to the private GitHub repository. Do not publish this reconstructed version to AI Studio until a local build and mobile test both pass.

## Safety

- The original production app is not modified.
- This repository is private.
- Create a branch and run the build before making future changes or publishing.
