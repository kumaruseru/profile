
# Portfolio Remix.js

Portfolio cá nhân được xây dựng với Remix.js, React, Tailwind CSS và Vite.

## 🚀 Hướng dẫn sử dụng

### 1. Cài đặt

```bash
npm install
```

### 2. Chạy server phát triển

```bash
npm run dev
```
Truy cập: [http://localhost:5173](http://localhost:5173)

### 3. Build production

```bash
npm run build
```

### 4. Chạy server production

```bash
npm start
```

## 📁 Cấu trúc thư mục

```
app/
├── components/
│   ├── ui/            # UI components (Card, Badge, ...)
│   ├── sections/      # Các section chính (Profile, Experience, ...)
│   └── Controls.jsx   # Điều khiển theme/ngôn ngữ
├── contexts/          # Contexts cho theme và ngôn ngữ
├── data/              # Dữ liệu portfolio (đa ngôn ngữ)
├── routes/            # Các route Remix
├── styles/            # CSS & Tailwind
├── entry.client.tsx   # Entry client
├── entry.server.tsx   # Entry server
└── root.jsx           # Layout gốc
```

## ✨ Tính năng nổi bật

- Giao diện hiện đại, responsive
- Chuyển đổi Dark/Light mode
- Đa ngôn ngữ (Tiếng Việt/English)
- Xuất PDF nhanh
- Tích hợp Google Maps
- Hiệu ứng Typewriter cho chức danh
- Avatar cá nhân

## 🛠️ Công nghệ sử dụng

- **Remix.js**: Framework React fullstack
- **React 18**: UI library
- **Tailwind CSS**: Styling utility
- **Vite**: Build tool
- **Lucide React**: Bộ icon SVG
- **react-simple-typewriter**: Hiệu ứng Typewriter

## 📄 License

© 2025 Hoang Trong Nghia. All rights reserved.
