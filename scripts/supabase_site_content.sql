-- Run this in Supabase Dashboard → SQL Editor (whole file at once).

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

-- Optional seed (empty JSON is normalized away by app; first save will populate)
insert into public.site_content (id, content)
values ('homepage', '{}'::jsonb)
on conflict (id) do nothing;

-- Let API role use the table
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.site_content to anon, authenticated;

alter table public.site_content enable row level security;

drop policy if exists "site_content_select_public" on public.site_content;
drop policy if exists "site_content_insert_public" on public.site_content;
drop policy if exists "site_content_update_public" on public.site_content;

create policy "site_content_select_public"
  on public.site_content for select
  using (true);

create policy "site_content_insert_public"
  on public.site_content for insert
  with check (true);

create policy "site_content_update_public"
  on public.site_content for update
  using (true)
  with check (true);
