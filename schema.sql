-- =============================================================
-- Tools That Work — Newsletter Subscribers Schema
-- =============================================================
-- Run this once in your Supabase project:
--   Dashboard → SQL Editor → New query → paste this entire file → Run
--
-- It creates a `newsletter_subscribers` table, an index, Row Level
-- Security policies, and a small helper view for the dashboard.
--
-- Idempotent: safe to re-run if you need to.
-- =============================================================


-- 1. The subscribers table
-- -------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique,
  source          text default 'newsletter',
  subscribed_at   timestamptz default now(),
  unsubscribed_at timestamptz,
  
  -- Defence-in-depth email validation. The frontend also validates,
  -- but a check constraint catches anything that slips past.
  constraint valid_email check (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

comment on table public.newsletter_subscribers is
  'Newsletter signups from toolsthatworks.com';
comment on column public.newsletter_subscribers.source is
  'Where the signup happened — useful when you add more capture points later';
comment on column public.newsletter_subscribers.unsubscribed_at is
  'Set when a subscriber unsubscribes — keeps row for compliance, marks as inactive';


-- 2. Index for time-based queries (your dashboard, exports)
-- -------------------------------------------------------------
create index if not exists newsletter_subscribers_subscribed_at_idx
  on public.newsletter_subscribers (subscribed_at desc);


-- 3. Row Level Security
-- -------------------------------------------------------------
-- This is the security model. The anon key in your frontend code is
-- public-by-design; RLS is what actually protects your data.
--
-- We allow:
--   • anon role → INSERT only (people can subscribe)
-- We block:
--   • anon role → SELECT, UPDATE, DELETE (no one can read or modify)
-- The service_role (your dashboard, your server-side code) bypasses
-- RLS entirely and can do everything.

alter table public.newsletter_subscribers enable row level security;

-- Drop existing policies if re-running (idempotent)
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;

-- The single permitted public action: insert a subscription
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);


-- 4. Active-subscribers view for your dashboard
-- -------------------------------------------------------------
-- Convenience view that excludes unsubscribed users. Use this when
-- exporting to an ESP later (Beehiiv, ConvertKit, etc).

create or replace view public.active_subscribers as
  select id, email, source, subscribed_at
  from public.newsletter_subscribers
  where unsubscribed_at is null
  order by subscribed_at desc;


-- =============================================================
-- DONE. Verify the setup:
-- 
-- Dashboard → Table Editor → newsletter_subscribers
--   You should see the empty table.
-- 
-- Dashboard → Authentication → Policies
--   You should see 1 policy on the table: "Anyone can subscribe"
--
-- Test from your live site:
--   Submit the newsletter form. The row should appear in the
--   Table Editor within a second.
-- =============================================================
