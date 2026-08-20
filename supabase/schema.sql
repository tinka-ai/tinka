-- supabase/schema.sql
-- Rulează acest script o singură dată în Supabase → SQL Editor,
-- ca să creezi tabela unde se înregistrează consimțămintele GDPR.

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  source text not null default 'chatbot',   -- de unde vine consimțământul (chatbot, ofertă, etc.)

  email text not null,
  name text,
  phone text,

  consent_text text not null,               -- textul EXACT pe care l-a bifat vizitatorul
  consent_given_at_client timestamptz,       -- ora de pe calculatorul vizitatorului
  consent_given_at_server timestamptz not null default now(), -- ora autoritativă, de pe server
  ip text,                                   -- IP-ul vizitatorului la momentul bifării

  offer_final text,
  conversation text
);

create index if not exists consents_email_idx on public.consents (lower(email));
create index if not exists consents_created_at_idx on public.consents (consent_given_at_server desc);

-- Row Level Security ACTIVAT, FĂRĂ nicio politică publică:
-- doar cheia "service_role" (folosită exclusiv din API routes, pe server)
-- poate citi sau scrie. Din browser nu se poate accesa tabela direct.
alter table public.consents enable row level security;
