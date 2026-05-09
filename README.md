# eunsue-home

Vite + React 기반 교수 홈페이지입니다.  
`#/admin`에서 편집한 콘텐츠는 Supabase DB에 저장되며, 모든 사용자가 같은 URL에서 동일한 최신 내용을 봅니다.

## Local run

```bash
npm install
npm run dev
```

## Supabase setup (required for shared content)

1. Supabase에서 아래 테이블을 생성합니다.

```sql
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);
```

2. 초기 데이터(선택):

```sql
insert into public.site_content (id, content)
values ('homepage', '{}'::jsonb)
on conflict (id) do nothing;
```

3. Vercel 환경 변수에 아래 값을 추가합니다.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD` (관리자 비밀번호)

4. Vercel에서 재배포 후 `https://eunsue-home.vercel.app/` 접속하여 확인합니다.

## Notes

- Supabase 환경 변수가 없으면 로컬 폴백(`localStorage`)으로 동작합니다.
- 실제 운영에서는 Supabase RLS 정책을 반드시 설정하세요.