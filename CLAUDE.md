# Cartmanify Web App Documentation

## ✨ Overview

"Cartmanify" is a web application that transforms polite English sentences into phrases spoken in the style of Eric Cartman from _South Park_, with an optional censorship level ("sensor level"). It uses the OpenAI API for natural language transformations.

---

## ⚙️ Tech Stack

### Frontend

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: React 19.1.0

### Backend

- **API Route**: Next.js App Router (`/api/transform`)
- **AI Integration**: OpenAI API (GPT-4 Turbo)
- **Runtime**: Node.js 18+

---

## 🌐 Core Features

| Feature          | Description                                                     | Status |
| ---------------- | --------------------------------------------------------------- | ------ |
| Text Input       | User enters polite or formal English text                       | ✅     |
| Transform Button | Sends input to OpenAI API for conversion                        | ✅     |
| Output Display   | Displays the converted Cartman-style text                       | ✅     |
| Sensor Level     | Allows user to choose censorship level: `Mild`, `Medium`, `Raw` | ✅     |
| Copy Button      | Easily copy the transformed text                                | ✅     |
| Dark Mode        | Automatic dark mode support                                     | ✅     |
| Error Handling   | User-friendly error messages                                    | ✅     |
| Loading States   | Visual feedback during transformation                           | ✅     |

---

## 🧰 Sensor Level Details

| Level  | Behavior                                                       |
| ------ | -------------------------------------------------------------- |
| Mild   | No swear words or replaced with full censorship (e.g., `s***`) |
| Medium | Partial masking (e.g., `f**kin'`, `b*tch`)                     |
| Raw    | Full Cartman profanity (no censorship)                         |

---

## 🚀 Sample API Integration

### System Prompt

```
You are Eric Cartman from South Park. Transform the user's input into your typical speaking style:
- Be sarcastic, self-centered, and somewhat rude
- Maintain the original meaning but add your personality
- Use exaggerated reactions and dramatic statements
- Include your catchphrases when appropriate (e.g., "Screw you guys", "Respect my authoritah!")
- [Sensor level instructions based on selection]
```

### Example Transformation

**User Input:** "Thank you. We are happy with the information you provided. Please close the ticket at your convenience."

**Transformed Output (Medium):** "Yeah, thanks or whatever. I guess the info you gave us is good enough, so just close the damn ticket whenever you feel like it. Appreciate the help, I guess... just don't screw it up next time."

---

## 📚 Project Structure

```
cartmanify/
├── app/
│   ├── api/
│   │   └── transform/
│   │       └── route.ts        # OpenAI API integration
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main UI component
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── CLAUDE.md                   # This file
├── README.md                   # User documentation
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🚪 API Route Details

### Endpoint: `/api/transform`

**Method:** POST

**Request Body:**

```typescript
{
  text: string;           // Required: Text to transform
  sensorLevel: 'mild' | 'medium' | 'raw';  // Optional: Default 'medium'
  character?: string;     // Optional: For future expansion
}
```

**Response:**

```typescript
{
  transformed: string; // Cartman-style text
  original: string; // Original input
  sensorLevel: string; // Applied sensor level
}
```

**Error Responses:**

- `400`: Invalid input or sensor level
- `401`: Invalid OpenAI API key
- `429`: Rate limit exceeded
- `500`: Server error

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🌟 Future Enhancements

- **Character Expansion**: Add Kyle, Stan, Kenny, and other characters
- **History Feature**: Save and view previous transformations
- **Voice Synthesis**: Generate audio with Cartman's voice
- **Share Feature**: Share transformations on social media
- **API Rate Limiting**: Implement user-based rate limiting
- **Batch Processing**: Transform multiple texts at once
- **Chrome Extension**: Quick transform from any webpage

---

## 📅 Implementation Status

| Phase       | Tasks                                              | Status |
| ----------- | -------------------------------------------------- | ------ |
| **Phase 1** | Project setup, dependencies, API route             | ✅     |
| **Phase 2** | UI implementation, sensor levels, styling          | ✅     |
| **Phase 3** | Error handling, loading states, copy feature       | ✅     |
| **Phase 4** | Documentation, environment setup, deployment ready | ✅     |

---

## 🚀 Deployment Notes

1. **Environment Variables Required:**
   - `OPENAI_API_KEY`: Your OpenAI API key

2. **Recommended Platforms:**
   - Vercel (zero-config deployment)
   - Any Node.js 18+ hosting platform

3. **Production Considerations:**
   - Implement rate limiting
   - Add monitoring/logging
   - Consider caching for common phrases
   - Set up proper CORS if needed

---

## 📝 Development Notes

- The app uses Next.js 15 App Router for modern React Server Components
- Tailwind CSS v4 provides efficient styling with dark mode support
- TypeScript ensures type safety throughout the application
- The OpenAI integration uses GPT-4 Turbo for best results
- Error boundaries and proper error handling ensure a smooth user experience

---
