# 그룹영어 교사 개별 스케줄러 (GitHub Pages 버전)

폴더 안에 폴더 없이, 파일 6개로만 구성된 버전입니다. GitHub 저장소에 이 파일들을 그대로 올리고
GitHub Pages를 켜면 별도 빌드 없이 바로 페이지 주소가 생깁니다.

## 파일 구성
- `index.html` — 교사용 화면 주소
- `admin.html` — 관리자용 화면 주소 (비밀번호 필요)
- `app.js` — 앱 전체 로직 (교사/관리자 화면이 이 파일 하나를 같이 사용합니다)
- `styles.css` — 스타일
- `supabase-config.js` — 실시간 공유 저장소 연결 설정 (아래 안내대로 값 채우기)
- `README.md` — 이 안내 파일

## 1. GitHub Pages로 배포하기
1. GitHub에서 새 저장소를 만들고, 이 폴더 안의 파일 6개를 그대로 업로드(커밋)합니다.
   (폴더를 만들지 말고 파일들을 저장소 최상위에 바로 올려주세요.)
2. 저장소의 **Settings → Pages**로 이동합니다.
3. **Source**를 "Deploy from a branch"로, **Branch**를 `main` / `/(root)`로 선택 후 저장합니다.
4. 1~2분 후 `https://[깃허브아이디].github.io/[저장소이름]/` 주소가 생깁니다.
   - 교사용 주소: `https://[깃허브아이디].github.io/[저장소이름]/`
   - 관리자용 주소: `https://[깃허브아이디].github.io/[저장소이름]/admin.html`

## 2. 모두에게 같은 데이터가 보이게 하기 (Supabase 연동)
지금 상태로는 각자의 브라우저에만 저장됩니다. 모든 선생님이 같은 내용을 실시간으로 보고 저장하려면
Supabase(무료)를 한 번만 연결하면 됩니다.

1. https://supabase.com 접속 → 회원가입(구글 계정 가능) → **New Project** 생성
   (지역은 Northeast Asia / Seoul이 있으면 선택, 없으면 가까운 지역 아무거나 선택해도 됩니다)
2. 프로젝트가 만들어지면 왼쪽 메뉴 **SQL Editor**로 이동해서 아래 SQL을 붙여넣고 실행(Run)하세요.

```sql
drop table if exists scheduler_state cascade;

create table scheduler_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table scheduler_state enable row level security;

create policy "public read" on scheduler_state
  for select using (true);

create policy "public write" on scheduler_state
  for insert with check (true);

create policy "public update" on scheduler_state
  for update using (true);

alter publication supabase_realtime add table scheduler_state;
```

3. 왼쪽 메뉴 **Project Settings → API**로 이동해서 다음 두 값을 복사하세요.
   - **Project URL**
   - **anon public** 키
4. 이 프로젝트의 `supabase-config.js` 파일을 열어서 `YOUR_SUPABASE_PROJECT_URL`과
   `YOUR_SUPABASE_ANON_KEY` 자리에 각각 붙여넣고 저장한 뒤, 다시 GitHub에 올려주세요(커밋).
5. 페이지를 새로고침하면 상단에 "실시간 공유중" 표시가 뜨고, 이제부터는 누가 저장하든
   같은 내용이 모두에게 실시간으로 반영됩니다.

### 보안 안내
- 위 SQL은 "누구나 읽고 쓸 수 있음" 정책입니다 — URL만 알면 데이터를 볼 수 있는 내부용 설정입니다.
  구성원이 아닌 사람에게 주소가 퍼지지 않도록 주의해주세요.
- 관리자 비밀번호도 이 공유 데이터 안에 함께 저장되는 방식이라 진짜 로그인 인증은 아닙니다.
  진입 장벽 정도로 생각해주세요. 민감한 개인정보를 다루게 되면 이후 Supabase Auth 등 정식 인증으로
  교체하는 걸 권장드립니다.

## 3. 관리자 / 교사 화면 차이
- `index.html` (교사용): 관리자 로그인 버튼이 아예 없습니다. 평소 업무용 화면입니다.
- `admin.html` (관리자용): 처음 접속 시 비밀번호를 설정하고, 이후에는 비밀번호를 입력해야 들어갑니다.
  로그인하면 상단에 "팀·교사 관리" 버튼이 생겨서 팀 추가/삭제, 교사 추가/삭제, 비밀번호 변경이 가능합니다.
  "교사 화면처럼 보기"를 누르면 관리자 화면 안에서도 일반 교사 화면으로 전환해 확인할 수 있습니다.

## 4. 주요 기능
- 팀/교사 선택, 통계 카드(총/미완료/진행중/완료/이관회원) — 카드를 클릭하면 해당 상태 회원만 걸러서 보여줍니다 (다시 클릭하면 해제)
- 회원 리스트: 검색/필터, 중요 체크박스(빨간 강조), 시작주차·메모 미리보기가 한 줄에 바로 표시
- "엑셀 업로드"로 회원번호/이름/학년/레벨/상품/요일/시간이 있는 엑셀을 업로드하면 회원이 자동으로 추가됩니다
  (표의 형식이 다양해서 완벽하지 않을 수 있어요 — 업로드 후 꼭 확인해주세요)
- "엑셀 다운로드"로 현재 교사의 회원 목록을 바로 저장
- 비고(가능 시간대) 문구를 분석해서 배정 가능한 시간을 회원 카드 바로 아래 추천 (예: "화 6시 이후 가능" 인식)
- 회원의 요일/시간을 정원이 찬 슬롯으로 두면 카드에 바로 "정원 초과입니다" 경고 표시
- 우측 캘린더: 레벨마다 다른 색, 레벨/인원 글자 크게 표시, FULL/정원초과 예정 배지
- 회원 카드를 캘린더 칸으로 드래그하면 시간이 바로 바뀝니다
- 좌측 회원 리스트가 더 넓고 우측 캘린더가 더 좁게 기본 비율 조정됨 (경계선 드래그로 조절 가능)

## 참고: 비고 기반 추천의 한계
"월,수 저녁 가능", "화 6시 이후 가능"처럼 자주 쓰는 표현은 인식하지만, 완전한 자연어 이해는 아닙니다.
추천이 안 뜨거나 이상하면 비고 문구를 조금 더 명확하게(예: "화,목 저녁 가능") 적어주세요.
