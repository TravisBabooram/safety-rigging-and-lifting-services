-- Tighten RLS on content tables so writes require admin/editor role, not
-- just "authenticated". Previously any signed-in user (new signups default
-- to role 'viewer') could insert/update/delete services, portfolio items,
-- PDF documents, and page content directly via the Supabase client,
-- bypassing the app's own ProtectedRoute role checks entirely.
--
-- NOTE: This file is created for review only. Do not run it automatically —
-- apply manually via the Supabase dashboard.

-- ─── services ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin Insert Services" ON public.services;
DROP POLICY IF EXISTS "Admin Update Services" ON public.services;
DROP POLICY IF EXISTS "Admin Delete Services" ON public.services;

CREATE POLICY "editors_can_insert" ON public.services
FOR INSERT TO authenticated
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "editors_can_update" ON public.services
FOR UPDATE TO authenticated
USING (public.get_current_user_role() IN ('admin', 'editor'))
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "admins_can_delete" ON public.services
FOR DELETE TO authenticated
USING (public.get_current_user_role() = 'admin');

-- ─── portfolio ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin Insert Portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admin Update Portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admin Delete Portfolio" ON public.portfolio;

CREATE POLICY "editors_can_insert" ON public.portfolio
FOR INSERT TO authenticated
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "editors_can_update" ON public.portfolio
FOR UPDATE TO authenticated
USING (public.get_current_user_role() IN ('admin', 'editor'))
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "admins_can_delete" ON public.portfolio
FOR DELETE TO authenticated
USING (public.get_current_user_role() = 'admin');

-- ─── pdf_documents ──────────────────────────────────────────────────────
-- Was a single "FOR ALL" policy covering insert/update/delete together.
DROP POLICY IF EXISTS "Authenticated users can manage PDF documents" ON public.pdf_documents;

CREATE POLICY "editors_can_insert" ON public.pdf_documents
FOR INSERT TO authenticated
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "editors_can_update" ON public.pdf_documents
FOR UPDATE TO authenticated
USING (public.get_current_user_role() IN ('admin', 'editor'))
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "admins_can_delete" ON public.pdf_documents
FOR DELETE TO authenticated
USING (public.get_current_user_role() = 'admin');

-- ─── page_content ───────────────────────────────────────────────────────
-- Was a single "FOR ALL" policy covering insert/update/delete together.
DROP POLICY IF EXISTS "Authenticated users can manage page content" ON public.page_content;

CREATE POLICY "editors_can_insert" ON public.page_content
FOR INSERT TO authenticated
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "editors_can_update" ON public.page_content
FOR UPDATE TO authenticated
USING (public.get_current_user_role() IN ('admin', 'editor'))
WITH CHECK (public.get_current_user_role() IN ('admin', 'editor'));

CREATE POLICY "admins_can_delete" ON public.page_content
FOR DELETE TO authenticated
USING (public.get_current_user_role() = 'admin');
