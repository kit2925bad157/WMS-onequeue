
# OneQueue (National Unified Virtual Queue)

OneQueue is a social-impact platform designed to eliminate physical waiting lines at government facilities (hospitals, ration shops, and public offices).

## 🚀 Deployment to Vercel

### 1. Requirements
Ensure you have a **Google Gemini API Key**. You can obtain one from the [Google AI Studio](https://aistudio.google.com/).

### 2. Steps to Deploy
1. **Push to GitHub**: Push this repository to a new private or public GitHub repo.
2. **Import to Vercel**: Go to [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. **Environment Variables**: During the configuration step, add the following environment variable:
   - `API_KEY`: *Your Google Gemini API Key*
4. **Deploy**: Click **Deploy**. Vercel will automatically detect Vite and build the project using the configuration provided in `package.json` and `vercel.json`.

## 🛠 Tech Stack
- **Framework**: React 19 (Experimental)
- **Routing**: React Router 7
- **AI Engine**: Google Gemini API (@google/genai)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Scanning**: HTML5-QRCode

## 📱 PWA Support
This app is ready to be installed as a Progressive Web App. It includes:
- `manifest.json`: For home-screen installation.
- Responsive mobile-first UI.
- Offline-ready connectivity banners.

## 🏛 Infrastructure
- **Version**: 2.5 (Gov-Security Infrastructure)
- **Security**: AES-256 encrypted datalinks (simulated).
- **Compliance**: Designed with Aadhaar-validation flows for Indian Public Services.

---
*Developed by SC Tech for National Public Service Excellence.*
