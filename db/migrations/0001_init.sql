-- Create required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Profiles table mirrors Supabase auth users
create table if not exists public.profiles (
  id uuid primary key default auth.uid(),
  email text not null unique,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now())
);

-- Organizations represent teams or workspaces
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

-- Memberships join profiles to organizations with roles
create table if not exists public.memberships (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'member',
  inserted_at timestamptz not null default timezone('utc', now()),
  primary key (profile_id, organization_id)
);

-- Stripe subscription metadata
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text,
  plan text not null default 'free',
  current_period_end timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

-- Audit log of key workspace events
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
