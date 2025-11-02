-- Enable row level security
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.subscriptions enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles policies
create policy "Profiles are viewable by authenticated users" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "Users can update their profile" on public.profiles
  for update using (auth.uid() = id);

-- Organizations policies
create policy "Organization members can view" on public.organizations
  for select using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = id and m.profile_id = auth.uid()
    )
  );

create policy "Organization owners can update" on public.organizations
  for update using (owner_id = auth.uid());

create policy "Organization owners can delete" on public.organizations
  for delete using (owner_id = auth.uid());

create policy "Authenticated users can create organizations" on public.organizations
  for insert with check (auth.role() = 'authenticated');

-- Memberships policies
create policy "Members can view memberships" on public.memberships
  for select using (
    profile_id = auth.uid()
    or exists (
      select 1 from public.memberships m
      where m.organization_id = memberships.organization_id and m.profile_id = auth.uid()
    )
  );

create policy "Owners can manage memberships" on public.memberships
  for all using (
    exists (
      select 1 from public.organizations o
      where o.id = memberships.organization_id and o.owner_id = auth.uid()
    )
  );

-- Subscriptions policies
create policy "Organization members can view subscriptions" on public.subscriptions
  for select using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = subscriptions.organization_id and m.profile_id = auth.uid()
    )
  );

create policy "Service role can modify subscriptions" on public.subscriptions
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Audit log policies
create policy "Members can view audit logs" on public.audit_logs
  for select using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = audit_logs.organization_id and m.profile_id = auth.uid()
    )
  );

create policy "Service role can insert audit logs" on public.audit_logs
  for insert with check (auth.role() = 'service_role');
