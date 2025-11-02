-- Seed data for local development
insert into public.profiles (id, email, full_name)
values
  ('00000000-0000-0000-0000-000000000001', 'founder@example.com', 'Founding Member')
on conflict (id) do nothing;

insert into public.organizations (id, owner_id, name, slug)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Example Co', 'example-co')
on conflict (id) do nothing;

insert into public.memberships (profile_id, organization_id, role)
values
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'owner')
on conflict (profile_id, organization_id) do nothing;

insert into public.subscriptions (id, organization_id, stripe_customer_id, stripe_subscription_id, status, plan)
values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'cus_example',
    'sub_example',
    'active',
    'growth'
  )
on conflict (id) do nothing;

insert into public.audit_logs (id, organization_id, actor_id, action, metadata)
values
  (
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'workspace_initialized',
    jsonb_build_object('source', 'seed')
  )
on conflict (id) do nothing;
