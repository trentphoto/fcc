-- Site settings table: single-row config for live status and zoom link
create table public.site_settings (
  id integer primary key default 1,
  is_live boolean not null default false,
  zoom_link text not null default '',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- Seed the single row
insert into public.site_settings (id) values (1);

-- RLS: anon can read (public live-status endpoint) and update (admin API routes use anon key)
alter table public.site_settings enable row level security;

create policy "Allow anonymous select"
  on public.site_settings for select
  to anon
  using (true);

create policy "Allow anonymous update"
  on public.site_settings for update
  to anon
  using (true)
  with check (true);

-- Allow upsert (insert on conflict) from the admin settings route
create policy "Allow anonymous insert"
  on public.site_settings for insert
  to anon
  with check (true);
