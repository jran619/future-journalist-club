create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname, role)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'nickname'), ''),
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    'member'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create policy "boards are publicly readable"
on public.boards
for select
to anon, authenticated
using (true);

create policy "profiles are publicly readable"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "posts are publicly readable"
on public.posts
for select
to anon, authenticated
using (true);

create policy "authenticated users can insert posts"
on public.posts
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "users can update own posts"
on public.posts
for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "users can delete own posts"
on public.posts
for delete
to authenticated
using (auth.uid() = author_id);

create policy "comments are publicly readable"
on public.comments
for select
to anon, authenticated
using (true);

create policy "authenticated users can insert comments"
on public.comments
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "users can delete own comments"
on public.comments
for delete
to authenticated
using (auth.uid() = author_id);

create policy "authenticated users can create reports"
on public.reports
for insert
to authenticated
with check (auth.uid() = reporter_id);
