# Mint re-render of the overview video

`public/media/vocalis-overview.mp4` is a re-render of `vocalis-pitch-video` (the v2 composition, 36.4 s, 1920x1080, 60 fps, no audio, 5.1 MB, fast-start) with the mint and navy palette. The original v2 export is untouched. A copy of this render is also at `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo-v3-mint.mp4`.

Changes, all in `src/` (see `mint-rerender.patch`, made against a copy of the project):
- `theme.ts`: blue and purple tints replaced by mint and navy; ink and muted match the site.
- `lib/stage.tsx`: cursor colors.
- `scenes/Week.tsx`, `scenes/Call.tsx`: emerald glows replaced by teal.
- `scenes/Call.tsx`: "I can fix that. Your name and date of birth?" became "Sorry about that. Your name and date of birth?"
- `scenes/Dash.tsx`: the "41% Call Drop-Off" figure became "14 Calls on hold", to match the interactive demo.

To re-render: copy the project, apply the patch, then
`npx remotion render src/index.ts VocalisPitchDemo out/vocalis-mint.mp4 --codec=h264 --crf=21 --pixel-format=yuv420p --muted` (about 4 minutes on this machine, Node 22).
