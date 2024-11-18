## Effortly: Fullstack Trello Clone: Next.js 14, Server Actions, React, Prisma, Stripe, Tailwind, PostgreSQL, Pusher

### Live Demo:

https://effortly.vercel.app

### Key Features:

-   Auth (Clerk)
-   Organizations (Clerk)
-   Board creation, renaming and deleting with real time updates amongs all organization members using Websockets (Pusher)
-   Unsplash API for random beautiful cover images
-   List creation, rename, delete
-   List drag & drop reorder and copy
-   Card creation, rename, delete,
-   Card descriptiona adding, drag & drop reorder and copy
-   Card activity log, and global activity log
-   Board limit for every organization
-   Stripe subscription for each organization to unlock unlimited boards
-   Landing page, dashboard
-   PostgreSQL DB
-   Prisma ORM
-   ShadcnUI & TailwindCSS
-   Hosted on Vercel

### How to run locally:

-   Clone this repo
-   Install packages: `npm install`

#### Setup `./.env` file:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
DIRECT_URL
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
STRIPE_API_KEY=
NEXT_PUBLIC_APP_URL=
STRIPE_WEBHOOK_SECRET=
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_KEY=
PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=

### Setup Prisma

#### 1) Add Postgres databse (e.g. Neon, Supabase)

`npx prisma generate`
`npx prisma db push`

#### 2) Start the app:

`npm run dev`

App now runs on http://localhost:3000
