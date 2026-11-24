# Pet Shelter NG: Next.js site

The Pet Shelter NG prototype rebuilt as a Next.js (App Router, TypeScript) project: real routes, `[slug]` pages for animals and rescue stories, and a protected admin area with a fixed left sidebar.

## Run it

```bash
npm install
cp .env.example .env.local     # then edit it
npm run dev                    # http://localhost:3000
```

Needs Node 18.18 or newer. Deploys to Vercel as is (add the same variables in the project settings).

## Routes

| URL | What it is |
| --- | --- |
| `/` | Home |
| `/about` | About us and team |
| `/adopt` | Animals with filters, adoption application form |
| `/adopt/[slug]` | One animal: `/adopt/tobi`, `/adopt/bisi`, ... |
| `/foster` | Foster information and application |
| `/impact` | Stats, rescue stories, adoption wall, campaigns |
| `/impact/[slug]` | One rescue story: `/impact/bingo`, ... |
| `/petfest` | PetFest Abuja: highlights, tickets, vendors, sponsors |
| `/get-involved` | Volunteer and partner forms (`#volunteer`, `#partner`) |
| `/donate` | Donation widget (`?for=A%20specific%20animal` pre-selects a purpose) |
| `/report` | Report an animal in need |
| `/contact` | Contact form and map |
| `/admin/login` | Staff sign-in |
| `/admin` | Overview |
| `/admin/animals`, `/admin/animals/new`, `/admin/animals/[slug]` | Animal list, add, edit |
| `/admin/applications`, `/follow-ups`, `/medical`, `/volunteers`, `/donations`, `/petfest`, `/reports` | The other staff sections |
| `POST /api/forms/[kind]` | Receives every public form |

## Admin area

* `src/app/admin/(panel)/layout.tsx` renders `AdminSidebar` (fixed to the left, `position: fixed`) beside the scrolling content. On screens under 1000px the sidebar becomes a top bar.
* Locked by `src/middleware.ts`. Set `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env.local`; until both are set, sign-in is disabled (there is no default password).
* The password gate is a stand-in. Before going live, replace `src/lib/auth.ts` and `src/app/admin/actions.ts` with proper staff accounts and roles (for example Auth.js, Clerk or Supabase Auth).

## Where things live

```
src/app/(site)/        public pages, shared header and footer
src/app/admin/         sign-in + (panel)/ pages with the fixed sidebar
src/app/api/forms/     form endpoint
src/components/        header, footer, forms, animal cards, adoption wall, donate widget
src/components/admin/  sidebar, tables, animal editor
src/lib/data.ts        sample animals, stories, team (swap for database calls)
src/lib/admin-data.ts  sample admin records
src/lib/config.ts      email, address, social links, WhatsApp, GoFundMe
public/images/         logo and photos
```

## What is sample data and what is real

Real and working: layout, navigation, routing, filters, forms with validation, adoption wall with swipe and lightbox, donation widget interactions, admin sign-in and route protection.

Sample or not connected yet:

* Animals, stories, team, figures and every admin table are sample data in `src/lib/`.
* Forms post to `/api/forms/[kind]`, which only validates and logs. Add database writes and emails there.
* Admin "Save" buttons show a demo message.
* Donations do not take payment (Paystack or Flutterwave to be added).
* Set `NEXT_PUBLIC_WHATSAPP` and `NEXT_PUBLIC_GOFUNDME` to switch those buttons on. Add the phone number, bank details and team names in the pages.

## Suggested next steps for the build stage

1. Database (Postgres with Prisma, or Supabase) for animals, applications, follow-ups, donations, volunteers, reports.
2. File storage for animal photos and report photos (Supabase Storage, S3 or Cloudinary).
3. Email (Resend or Postmark): confirmations, staff alerts and the 7, 30, 90 day, 6 and 12 month follow-up reminders.
4. Real auth with roles (administrator, staff, volunteer).
5. Payments and the GoFundMe link.

## Note on how this was checked

The project was written without network access, so `npm install` and `next build` were not run. The code was syntax-checked and type-checked against stubs. Run `npm install && npm run typecheck && npm run build` once and fix anything the real type definitions flag.
