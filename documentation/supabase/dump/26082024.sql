
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."assistant" (
    "assistantId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "typeCommunication" character varying DEFAULT 'external-api'::character varying NOT NULL,
    "title" character varying NOT NULL,
    "description" "text" NOT NULL,
    "emoji" character varying,
    "avatar" character varying,
    "modelTemperature" character varying NOT NULL,
    "promptSystem" "text" NOT NULL,
    "webhookUrl" character varying,
    "additionalData" "text",
    "snippet" character varying[],
    "isLocal" boolean DEFAULT false NOT NULL,
    "intents" "json",
    "llm" character varying
);

ALTER TABLE "public"."assistant" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."conversation" (
    "updatedAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "summary" "text" DEFAULT 'NULL'::"text",
    "title" character varying,
    "responseStream" boolean DEFAULT false NOT NULL,
    "assistant" "uuid" NOT NULL,
    "assistantTitle" character varying NOT NULL,
    "assistantAvatar" character varying NOT NULL,
    "conversationId" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "device" character varying,
    "userName" character varying
);

ALTER TABLE "public"."conversation" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."icon" (
    "key" character varying NOT NULL,
    "raycast" character varying NOT NULL
);

ALTER TABLE "public"."icon" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."intent" (
    "intentId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "number" bigint NOT NULL,
    "categoryName" character varying NOT NULL,
    "description" "text" NOT NULL,
    "useMemory" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."intent" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."llm" (
    "key" character varying NOT NULL,
    "title" character varying NOT NULL,
    "company" character varying NOT NULL,
    "model" character varying NOT NULL,
    "trainingDataTo" character varying,
    "tokens" "json",
    "isLocal" boolean DEFAULT false,
    "fileDownloadUrl" character varying,
    "fileDownloadName" character varying
);

ALTER TABLE "public"."llm" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."memory" (
    "memoryId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "userName" character varying NOT NULL,
    "name" character varying NOT NULL,
    "category" character varying,
    "content" "text" NOT NULL,
    "reflexion" "text",
    "source" "text",
    "secret" "text",
    "tags" "jsonb" NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."memory" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."message" (
    "messageId" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question" "json" NOT NULL,
    "answer" "json",
    "conversation" "text" NOT NULL,
    "updatedAt" timestamp with time zone,
    "answerContent" "text"
);

ALTER TABLE "public"."message" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."skill_deprecated" (
    "name" character varying NOT NULL,
    "category" character varying NOT NULL,
    "description" "text" NOT NULL,
    "schema" "json" NOT NULL,
    "command" character varying,
    "url" character varying,
    "function" character varying,
    "tags" "json" NOT NULL,
    "active" boolean DEFAULT false NOT NULL,
    "skillId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."skill_deprecated" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."snippet" (
    "snippetId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "typeCommunication" character varying DEFAULT 'external-api'::character varying NOT NULL,
    "title" character varying NOT NULL,
    "category" character varying NOT NULL,
    "emoji" character varying NOT NULL,
    "model" character varying NOT NULL,
    "modelTemperature" character varying NOT NULL,
    "promptSystem" "text",
    "webhookUrl" character varying,
    "isLocal" boolean DEFAULT false NOT NULL,
    "description" "text",
    "schema" "jsonb",
    "postSchema" "jsonb",
    "tag" "jsonb"
);

ALTER TABLE "public"."snippet" OWNER TO "postgres";

ALTER TABLE ONLY "public"."icon"
    ADD CONSTRAINT "Icon_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."assistant"
    ADD CONSTRAINT "assistant_pkey" PRIMARY KEY ("assistantId");

ALTER TABLE ONLY "public"."conversation"
    ADD CONSTRAINT "conversation_pkey" PRIMARY KEY ("conversationId");

ALTER TABLE ONLY "public"."intent"
    ADD CONSTRAINT "intent_pkey" PRIMARY KEY ("intentId");

ALTER TABLE ONLY "public"."llm"
    ADD CONSTRAINT "llm_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."memory"
    ADD CONSTRAINT "memory_pkey" PRIMARY KEY ("memoryId");

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_pkey" PRIMARY KEY ("messageId");

ALTER TABLE ONLY "public"."skill_deprecated"
    ADD CONSTRAINT "skill_pkey" PRIMARY KEY ("skillId");

ALTER TABLE ONLY "public"."snippet"
    ADD CONSTRAINT "snippet_pkey" PRIMARY KEY ("snippetId");

ALTER TABLE ONLY "public"."assistant"
    ADD CONSTRAINT "assistant_llm_fkey" FOREIGN KEY ("llm") REFERENCES "public"."llm"("key");

ALTER TABLE ONLY "public"."conversation"
    ADD CONSTRAINT "conversation_assistant_fkey" FOREIGN KEY ("assistant") REFERENCES "public"."assistant"("assistantId");

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_conversation_fkey" FOREIGN KEY ("conversation") REFERENCES "public"."conversation"("conversationId");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."assistant" TO "anon";
GRANT ALL ON TABLE "public"."assistant" TO "authenticated";
GRANT ALL ON TABLE "public"."assistant" TO "service_role";

GRANT ALL ON TABLE "public"."conversation" TO "anon";
GRANT ALL ON TABLE "public"."conversation" TO "authenticated";
GRANT ALL ON TABLE "public"."conversation" TO "service_role";

GRANT ALL ON TABLE "public"."icon" TO "anon";
GRANT ALL ON TABLE "public"."icon" TO "authenticated";
GRANT ALL ON TABLE "public"."icon" TO "service_role";

GRANT ALL ON TABLE "public"."intent" TO "anon";
GRANT ALL ON TABLE "public"."intent" TO "authenticated";
GRANT ALL ON TABLE "public"."intent" TO "service_role";

GRANT ALL ON TABLE "public"."llm" TO "anon";
GRANT ALL ON TABLE "public"."llm" TO "authenticated";
GRANT ALL ON TABLE "public"."llm" TO "service_role";

GRANT ALL ON TABLE "public"."memory" TO "anon";
GRANT ALL ON TABLE "public"."memory" TO "authenticated";
GRANT ALL ON TABLE "public"."memory" TO "service_role";

GRANT ALL ON TABLE "public"."message" TO "anon";
GRANT ALL ON TABLE "public"."message" TO "authenticated";
GRANT ALL ON TABLE "public"."message" TO "service_role";

GRANT ALL ON TABLE "public"."skill_deprecated" TO "anon";
GRANT ALL ON TABLE "public"."skill_deprecated" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_deprecated" TO "service_role";

GRANT ALL ON TABLE "public"."snippet" TO "anon";
GRANT ALL ON TABLE "public"."snippet" TO "authenticated";
GRANT ALL ON TABLE "public"."snippet" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
