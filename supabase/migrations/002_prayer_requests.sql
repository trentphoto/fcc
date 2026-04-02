-- Prayer requests submitted from the public site (insert via anon key + RLS)
create table public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  request text not null,
  created_at timestamptz not null default now()
);

comment on table public.prayer_requests is 'Public prayer form submissions; view in Supabase dashboard or a future admin UI.';

alter table public.prayer_requests enable row level security;

-- Site visitors can submit; anon key is used from the Next.js API route
create policy "Allow anonymous insert prayer requests"
  on public.prayer_requests for insert
  to anon
  with check (true);

-- No select/update/delete for anon — prevents scraping via the client key
