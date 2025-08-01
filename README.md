# Cartmanify

Transform your polite text into Eric Cartman's speaking style! This web application uses OpenAI's API to convert formal or polite English into phrases spoken in the style of Eric Cartman from South Park.

## Features

- **Text Transformation**: Convert polite text into Cartman's sarcastic, self-centered style
- **Sensor Levels**: Choose from three censorship levels:
  - **Mild**: Family-friendly (no profanity)
  - **Medium**: Partial censorship (e.g., f**kin', b*tch)
  - **Raw**: Full uncensored Cartman
- **Copy to Clipboard**: Easily copy transformed text
- **Dark Mode Support**: Works with system theme preferences

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cartmanify.git
cd cartmanify
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **API**: OpenAI GPT-4 Turbo
- **Deployment**: Vercel (recommended)

## Usage

1. Enter your polite or formal text in the input field
2. Select your preferred sensor level
3. Click "Transform to Cartman"
4. Copy the transformed text using the clipboard button

## Example

**Input**: "Thank you. We are happy with the information you provided. Please close the ticket at your convenience."

**Output (Medium)**: "Yeah, thanks or whatever. I guess the info you gave us is good enough, so just close the damn ticket whenever you feel like it. Appreciate the help, I guess... just don't screw it up next time."

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project to Vercel
3. Add your `OPENAI_API_KEY` in the environment variables section
4. Deploy!

## Contributing

Feel free to submit issues and enhancement requests!

## Disclaimer

This project is for entertainment purposes only and is not affiliated with South Park or Comedy Central.

## License

MIT