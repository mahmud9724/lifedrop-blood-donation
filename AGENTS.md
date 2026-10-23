<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Blood Requests experience in shared frontend components and local fixtures so /blood-requests and the existing /requests URL remain functional without duplicating listing logic.
- Request details use the route's validated id search parameter so links from existing cards open a shareable accessible dialog; donor help is a preview only.
- The Donor Directory (/donors and /donors/$slug) uses shared frontend components and the donors fixture in src/data/donors.ts; contact is a privacy-conscious preview and public donor profiles never include contact details.
