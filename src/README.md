# 🌟 lightspace

> 공간의 분위기를 완성하는 조명을 쉽고 즐겁게 발견할 수 있는 플랫폼

lightspace는 사용자가 완벽한 조명을 찾을 수 있도록 도와주는 현대적인 e-커머스 플랫폼입니다. AI 기반 공간 분석과 직관적인 사용자 경험을 통해 조명 쇼핑을 혁신합니다.

![lightspace Preview](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop)

## ✨ 주요 기능

### 🛍️ 핵심 기능 (P0)
- **원클릭 구매 플로우**: 빠르고 간편한 구매 경험
- **완전한 쇼핑 플로우**: 제품 검색 → 장바구니 → 결제 → 주문 완료
- **실시간 장바구니 관리**: 수량 조절, 즐겨찾기 시스템

### 🎯 스타일 디스커버리 (P1)
- **AI 룸 분석**: 공간 사진 업로드로 맞춤형 조명 추천
- **스마트 필터링**: 공간별, 스타일별, 가격대별 필터
- **고급 검색**: 실시간 검색과 정렬 기능

### 🔒 안전한 주문 시스템 (P2)
- **간편 결제**: 원화 기반 결제 시스템
- **주문 추적**: 실시간 주문 상태 확인
- **고객 정보 관리**: 안전한 배송 정보 저장

## 🛠️ 기술 스택

### Frontend
- **React 18** + **TypeScript** - 현대적인 React 개발
- **Tailwind CSS v4** - 최신 버전의 유틸리티 CSS 프레임워크
- **Vite** - 빠른 개발 서버와 번들링
- **ShadCN UI** - 재사용 가능한 컴포넌트 라이브러리

### UI/UX
- **모바일 퍼스트** - iPhone 16 크기 최적화 (393x852px)
- **반응형 디자인** - 모든 디바이스 지원
- **애니메이션** - 부드러운 사용자 인터랙션

### 개발 도구
- **ESLint** + **Prettier** - 코드 품질 관리
- **TypeScript** - 타입 안전성
- **Git** - 버전 관리

## 📁 프로젝트 구조

```
lightspace/
├── src/                    # 소스 코드 디렉토리
│   ├── components/         # React 컴포넌트들
│   │   ├── ui/            # ShadCN UI 컴포넌트
│   │   ├── shared/        # 공용 컴포넌트 (StatusBar 등)
│   │   ├── figma/         # Figma 연동 컴포넌트
│   │   ├── ProductListPage.tsx    # 제품 목록 페이지
│   │   ├── ProductDetailPage.tsx  # 제품 상세 페이지
│   │   ├── BasketPage.tsx         # 장바구니 페이지
│   │   ├── CheckoutPage.tsx       # 주문 정보 페이지
│   │   ├── PaymentPage.tsx        # 결제 페이지
│   │   ├── ConfirmationPage.tsx   # 주문 확인 페이지
│   │   ├── OrderConfirmationPage.tsx # 주문 완료 페이지
│   │   ├── RoomAnalyzerPage.tsx   # AI 룸 분석 페이지
│   │   ├── AddToCartOverlay.tsx   # 장바구니 추가 오버레이
│   │   ├── Menu.tsx               # 사이드 메뉴
│   │   └── PlaceholderPage.tsx    # 개발중 페이지 템플릿
│   ├── data/              # 데이터 파일들
│   │   └── products.ts    # 조명 제품 데이터
│   ├── types/             # TypeScript 타입 정의
│   │   └── index.ts       # 통합 타입 정의
│   ├── styles/            # 스타일 파일들
│   │   └── globals.css    # Tailwind v4 + 커스텀 CSS
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── main.tsx           # React 앱 진입점
├── imports/               # Figma 가져온 SVG 에셋들
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 의존성 및 스크립트
├── tsconfig.json          # TypeScript 설정
├── vite.config.ts         # Vite 번들러 설정
├── eslint.config.js       # ESLint 설정
├── prettierrc.json        # Prettier 설정
├── .gitignore             # Git 무시 파일 목록
└── README.md              # 프로젝트 문서 (이 파일)
```

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18+ 
- **npm** 또는 **yarn** 또는 **pnpm**

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/lightspace.git
   cd lightspace
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 주요 명령어

- `npm run dev` - 개발 서버 실행 (포트 3000)
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run lint` - ESLint로 코드 검사

### 빌드

```bash
npm run build
# 또는
yarn build
# 또는
pnpm build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🏗️ 개발 가이드

### 프로젝트 구조 이해

- **컴포넌트**: 각 페이지와 기능별로 분리된 React 컴포넌트
- **타입 안전성**: 모든 데이터와 props는 TypeScript로 타입 정의
- **상태 관리**: React useState 기반 로컬 상태 관리
- **스타일링**: Tailwind CSS v4 + 커스텀 디자인 토큰

### 주요 컴포넌트 설명

- **App.tsx**: 라우팅과 전역 상태 관리
- **ProductListPage**: 제품 목록, 검색, 필터링
- **RoomAnalyzerPage**: AI 공간 분석 기능
- **BasketPage**: 장바구니 관리
- **CheckoutPage → PaymentPage → ConfirmationPage**: 결제 플로우

### 코딩 컨벤션

- **컴포넌트 명**: PascalCase (예: `ProductDetailPage`)
- **함수명**: camelCase (예: `handleAddToCart`)
- **상수명**: UPPER_SNAKE_CASE (예: `PRODUCTS`)
- **파일명**: kebab-case 또는 PascalCase

## 📝 사용법

### 기본 기능

1. **제품 검색**: 상단 검색바에서 조명 제품 검색
2. **필터링**: 공간별, 스타일별, 가격대별 필터 적용
3. **제품 상세**: 제품 클릭으로 상세 정보 확인
4. **장바구니**: 제품 추가 및 수량 관리
5. **결제**: 고객 정보 입력 및 결제 진행

### AI 룸 분석

1. **메인 페이지**에서 "AI 공간 분석" 배너 클릭
2. **공간 사진 업로드**
3. **AI 분석 결과** 확인 및 추천 제품 보기
4. **원클릭 장바구니 추가**

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.

## 👥 팀

- **프론트엔드 개발**: React + TypeScript + Tailwind CSS
- **UI/UX 디자인**: Figma 기반 모바일 퍼스트 디자인
- **AI 기능**: 공간 분석 및 추천 시스템

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든 연락해 주세요!

---

**lightspace** - 공간의 분위기를 완성하는 조명 플랫폼 ✨