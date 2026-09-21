# Project Guidance

## User Preferences

- Bilingual Khmer and English copy throughout the site
- Animated background is a core visual feature
- Recreate the look of the reference DIT RACING motorcycle shop site
- Motorcycle repair and maintenance shop branding
- Always display phone numbers 090 833 814 and 090 804 863 as tap-to-call links
- Location shown as Cambodia
- The shop directions link points to the exact Google Maps place https://maps.app.goo.gl/QPW3TTStmrmGfYJR9?g_st=ac

## Verified Commands

- **typecheck**: `pnpm --dir app typecheck`
- **fix**: `pnpm --dir app fix`
- **build**: `pnpm --dir app build`

## Learnings

- Backend files can pass mops build while every function body is still Debug.todo(); a clean compile is not evidence of implementation. Trace the mutation's success path to the backend function body, not just the generated binding signature.
- Under Enhanced Migration, a stable actor field owned by a component (e.g. accessControlState) must be declared type-only in main.mo and initialized inside the pending migration's NewActor via AccessControl.initState(); an inline initializer fails M0250 and omitting it from NewActor fails M0267.
- Motoko has no triple-quoted string literals; build long static Text by concatenating single-line literals with # and explicit \n escapes. Time.now() returns Int, so a Nat timestamp needs .toNat().
- Backend Result<T,E> maps to a generated TS union discriminated by __kind__ ('ok'|'err'), so frontend success checks must read result.__kind__ === 'ok'.
- Khmer script needs line-height >= 1.7 and zero negative tracking; a :lang(km) rule in @layer base protects it regardless of which font class a component uses.
- Biome's useSemanticElements rule rejects role="dialog" on a div; a native <dialog> with showModal() in an effect plus an onCancel handler satisfies it and gives free focus trapping.
- The app has a Vitest suite: `pnpm --dir app test` runs frontend component tests plus a PocketIC backend lane against the real canister; `pnpm --dir app typecheck` must also pass.
- The site defaults to Khmer, so tests asserting English copy must seed localStorage before mount; data-ocid is the test hook, not data-testid.
- DIRECTIONS_URL in src/frontend/src/lib/site-data.ts is the single source for the shop's Google Maps directions link; WhyUs.tsx consumes it with target=_blank and rel=noreferrer, so changing the constant updates the rendered link without touching the component.
- The gallery lightbox uses a native <dialog> with showModal() plus a window keydown listener; Escape fires both cancel and keydown, but onClose is idempotent so there is no double-close bug.
- The lightbox backdrop is a full-inset <button> rendered before the figure; figure z-[5] and nav z-10 keep image/nav above it so outside-click closes correctly.
