# Cartman-GPT Documentation

## ✨ Overview

"Cartman-GPT" is an AI-powered chat application that lets users have conversations with Eric Cartman from *South Park*. The app uses OpenAI's GPT model to generate authentic Cartman-style responses, complete with his signature personality traits, catchphrases, and optional profanity levels.

---

## ⚙️ Tech Stack

### Frontend

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: React 19.1.0

### Backend

- **API Route**: Next.js App Router (`/api/transform`)
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Runtime**: Node.js 18+

---

## 🌐 Core Features

| Feature            | Description                                                     | Status |
| ------------------ | --------------------------------------------------------------- | ------ |
| AI Chat Interface  | Real-time conversation with Cartman character                   | ✅     |
| Message History    | Chat messages displayed in conversation format                  | ✅     |
| Sensor Level       | Choose censorship level: `Mild`, `Medium`, `Raw`               | ✅     |
| Chat Sidebar       | Contains sensor level settings and conversation history         | ✅     |
| Theme Switcher     | Toggle between light and dark modes                             | ✅     |
| Error Handling     | User-friendly error messages in chat                            | ✅     |
| Loading States     | Typing indicator while Cartman responds                         | ✅     |
| Character Counter  | Shows remaining characters (500 max) in input                   | ✅     |
| Sample Texts       | Pre-loaded conversation starters                                | ✅     |
| Chat History       | Stores last 5 conversations in localStorage                     | ✅     |
| Keyboard Shortcuts | Enter to send, Shift+Enter for newline, Esc to clear          | ✅     |
| Responsive Design  | Mobile-friendly with collapsible sidebar                        | ✅     |

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
You are Eric Cartman from South Park. You're having a conversation with someone. Respond to their message in your typical style:
- Be sarcastic, self-centered, egotistical, and manipulative
- React dramatically to everything - you're either the victim or the hero, never in between
- Use your catchphrases when appropriate (e.g., "Screw you guys", "Respect my authoritah!", "But meeeeem!", "I'm not fat, I'm big-boned!")
- Show your obsessions: KFC, being in charge, getting what you want, scheming
- Be dismissive of others' feelings while being overly sensitive about your own
- Sometimes go on tangents about your elaborate plans or conspiracy theories
- [Sensor level instructions based on selection]

Remember: You're responding in a conversation, not just transforming text. React to what they're saying as Cartman would.
```

### Example Conversation

**User:** "Hi Cartman, how are you today?"

**Cartman (Medium):** "Oh, I'm just FANTASTIC! You know, just being awesome as usual while everyone else is being totally lame. Why do you care anyway? Unless you brought me some KFC, I don't have time for your stupid questions!"

**User:** "I need help with my homework."

**Cartman (Medium):** "Homework?! Seriously?! I don't do homework, that's for poor kids and hippies! Besides, I'm way too busy with more important things, like my genius business ventures. But I GUESS I could help you... for the right price. What's in it for me?"

---

## 📚 Project Structure

```
cartman-gpt/
├── app/
│   ├── api/
│   │   └── transform/
│   │       └── route.ts        # OpenAI API integration
│   ├── components/
│   │   ├── Sidebar.tsx        # Sidebar with settings and history
│   │   ├── MessageList.tsx    # Chat message display
│   │   ├── ChatMessage.tsx    # Individual message component
│   │   ├── InputArea.tsx      # Bottom input area
│   │   ├── TransformHistory.tsx # History display component
│   │   └── ThemeToggle.tsx    # Theme switcher component
│   ├── contexts/
│   │   └── ThemeContext.tsx   # Theme management context
│   ├── hooks/
│   │   ├── useTransformHistory.ts   # History management hook
│   │   └── useKeyboardShortcuts.ts  # Keyboard shortcuts hook
│   ├── constants/
│   │   └── sampleTexts.ts     # Sample text definitions
│   ├── globals.css             # Global styles with Tailwind CSS v4
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Main UI component
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── CLAUDE.md                   # This file
├── README.md                   # User documentation
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
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

# Run TypeScript type checking
npm run typecheck

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
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

| Phase       | Tasks                                                       | Status |
| ----------- | ----------------------------------------------------------- | ------ |
| **Phase 1** | Project setup, dependencies, API route                      | ✅     |
| **Phase 2** | UI implementation, sensor levels, styling                   | ✅     |
| **Phase 3** | Error handling, loading states, copy feature                | ✅     |
| **Phase 4** | Documentation, environment setup, deployment ready          | ✅     |
| **Phase 5** | Interface improvements (history, shortcuts, theme switcher) | ✅     |
| **Phase 6** | Code quality (ESLint, Prettier, TypeScript)                 | ✅     |
| **Phase 7** | OpenAI API integration and testing                          | ✅     |
| **Phase 8** | Conversion to chat interface (Cartman-GPT)                  | ✅     |

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
- Tailwind CSS v4 provides efficient styling with class-based dark mode support
- TypeScript ensures type safety throughout the application
- The OpenAI integration uses GPT-4o-mini model for conversational AI
- Error boundaries and proper error handling ensure a smooth user experience
- Component-based architecture for maintainability and reusability
- Custom hooks for state management and keyboard shortcuts
- Theme persistence with localStorage
- ESLint and Prettier configured for code quality
- Responsive design works on all device sizes

---
