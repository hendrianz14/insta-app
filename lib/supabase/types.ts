export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey";
            columns: ["owner_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      memberships: {
        Row: {
          profile_id: string;
          organization_id: string;
          role: string;
          inserted_at: string;
        };
        Insert: {
          profile_id: string;
          organization_id: string;
          role?: string;
          inserted_at?: string;
        };
        Update: {
          profile_id?: string;
          organization_id?: string;
          role?: string;
          inserted_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "memberships_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memberships_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          organization_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          status: string | null;
          plan: string;
          current_period_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: string | null;
          plan?: string;
          current_period_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: string | null;
          plan?: string;
          current_period_end?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          organization_id: string;
          actor_id: string | null;
          action: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          actor_id?: string | null;
          action: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          actor_id?: string | null;
          action?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey";
            columns: ["actor_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "audit_logs_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      create_team: {
        Args: { name: string; slug?: string | null };
        Returns: string;
      };
      log_audit_event: {
        Args: { organization_id: string; action: string; metadata?: Json };
        Returns: void;
      };
    };
  };
}
