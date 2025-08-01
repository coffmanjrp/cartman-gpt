# Cartmanify Web App Documentation

## ✨ Overview

"Cartmanify" is a web application that transforms polite English sentences into phrases spoken in the style of Eric Cartman from *South Park*, with an optional censorship level ("sensor level"). It uses the OpenAI API for natural language transformations.

---

## ⚙️ Tech Stack

### Frontend

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS

### Backend (Optional)

- **OpenAI API** for Cartman-style transformation
- Could be integrated client-side or with a lightweight API route in Next.js (`/api/cartmanify`)

---

## 🌐 Core Features

| Feature          | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| Text Input       | User enters polite or formal English text                       |
| Transform Button | Sends input to OpenAI API for conversion                        |
| Output Display   | Displays the converted Cartman-style text                       |
| Sensor Level     | Allows user to choose censorship level: `Mild`, `Medium`, `Raw` |
| Copy Button      | Easily copy the transformed text                                |

---

## 🧰 Sensor Level Details

| Level  | Behavior                                                       |
| ------ | -------------------------------------------------------------- |
| Mild   | No swear words or replaced with full censorship (e.g., `s***`) |
| Medium | Partial masking (e.g., `f**kin'`, `b*tch`)                     |
| Raw    | Full Cartman profanity (no censorship)                         |

---

## 🚀 Sample Prompt to OpenAI

**System Prompt:** "You are Eric Cartman from South Park. Rewrite user input in your typical sarcastic, self-centered, and rude tone. Make sure it sounds like Cartman speaking. Maintain meaning but exaggerate personality. Use censorship according to the selected sensor level: `Mild`, `Medium`, or `Raw`."

**User Input Example:** "Thank you. We are happy with the information you provided. Please close the ticket at your convenience."

**Transformed Output (Medium):** "Yeah, thanks or whatever. I guess the info you gave us is good enough, so just close the damn ticket whenever you feel like it. Appreciate the help, I guess... just don’t screw it up next time."

---

## 📚 Folder Structure (example) 

```
cartmanify/
## WIP
```

---

## 🚪 API Integration (simplified)

```ts
WIP
```

---

## 🌟 Future Enhancements

- Language toggle (for multilingual Cartman?)
- Character switcher (Kyle, Stan, Kenny)
- History panel or save feature
- Audio synthesis (Cartman voice)

---

## 📅 Project Timeline (Suggested)

| Phase  | Tasks                                             |
| ------ | ------------------------------------------------- |
| Week 1 | Setup project, build UI, local transform function |
| Week 2 | Integrate OpenAI API, sensor level support        |
| Week 3 | UI polish, mobile responsive, deploy to Vercel    |
| Week 4 | Testing, feedback loop, optional audio support    |

---

