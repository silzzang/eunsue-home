# eunsue-home

Vite + React 기반 교수 홈페이지입니다.  
`#/admin`에서 편집한 콘텐츠는 Supabase DB에 저장되며, 모든 사용자가 같은 URL에서 동일한 최신 내용을 봅니다.

## Local run

```bash
npm install
npm run dev
```

## Supabase setup (required for shared content)

`Could not find the table 'public.site_content'` 오류가 나면 **아직 테이블이 없는 것**입니다.

1. Supabase Dashboard → **SQL Editor**를 엽니다.
2. 프로젝트 루트의 **`scripts/supabase_site_content.sql`** 내용을 **전체 복사**해 붙여넣고 **Run** 합니다.  
   (테이블 생성 + `anon`용 RLS 정책까지 한 번에 적용됩니다.)

3. 로컬은 프로젝트 루트 **`d:\교육\cursor\.env.local`** 에만 두면 됩니다. `src\.env.local` 은 Vite가 읽지 않습니다.

4. Vercel 환경 변수에 아래 값을 추가합니다.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD` (관리자 비밀번호)

5. Vercel에서 재배포 후 `https://eunsue-home.vercel.app/` 접속하여 확인합니다.

## Notes

- `.env.local` 은 Git에 올리지 마세요. (커밋 전 `.gitignore`에 추가 권장)
- `scripts/supabase_site_content.sql` 의 RLS는 **공개 읽기·쓰기**입니다. 운영 시에는 관리자만 쓰도록 정책을 조정하세요.