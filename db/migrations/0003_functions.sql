-- Function to automatically create a profile record when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RPC to create an organization and assign the creator as owner
create or replace function public.create_team(team_name text, team_slug text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org_id uuid;
  final_slug text := coalesce(team_slug, regexp_replace(lower(team_name), '[^a-z0-9]+', '-', 'g'));
begin
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;

  insert into public.organizations (owner_id, name, slug)
  values (auth.uid(), team_name, final_slug)
  returning id into new_org_id;

  insert into public.memberships (profile_id, organization_id, role)
  values (auth.uid(), new_org_id, 'owner')
  on conflict (profile_id, organization_id) do update set role = excluded.role;

  return new_org_id;
end;
$$;

grant execute on function public.create_team(text, text) to authenticated;

-- RPC to log audit events from the application server
create or replace function public.log_audit_event(
  p_organization_id uuid,
  p_action text,
  p_metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_logs (organization_id, actor_id, action, metadata)
  values (p_organization_id, auth.uid(), p_action, p_metadata);
end;
$$;

grant execute on function public.log_audit_event(uuid, text, jsonb) to authenticated;
