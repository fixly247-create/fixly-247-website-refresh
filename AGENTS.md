<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Site content (nav, services, experience, reasons, contact, social URLs) lives in `src/lib/site.ts`; pages read from it so details stay consistent everywhere.
- Shared shell (header, footer, floating WhatsApp, page transition) lives in `src/routes/__root.tsx`; each page is its own route file with its own `head()`.
- Reusable visual effects are CSS classes in `src/styles.css` (`btn-fx`, `btn-orb`, `card-fx`, `exp-card`, `social-btn`, `field`…); components compose them instead of ad-hoc styles.
- The logo is rendered only through `src/components/site/Logo.tsx` (use `onDark` on dark backgrounds) so every placement uses the same asset.
- Enquiry email building/validation lives in `src/lib/enquiry.ts`, covered by `src/test/site-rules.test.ts`.
