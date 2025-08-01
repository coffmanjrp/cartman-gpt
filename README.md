# Cartman-GPT

Chat with Eric Cartman from South Park! This AI-powered chat application lets you have conversations with everyone's favorite self-centered, manipulative, and hilariously offensive fourth-grader.

## Features

- **AI Chat Interface**: Have real-time conversations with Cartman
- **Authentic Personality**: Responses include Cartman's signature catchphrases, dramatic reactions, and egotistical behavior
- **Sensor Levels**: Choose your comfort level with profanity:
  - **Mild**: Family-friendly (no profanity)
  - **Medium**: Partial censorship (e.g., f**kin', b*tch)
  - **Raw**: Full uncensored Cartman
- **Chat History**: View and revisit your previous conversations
- **Modern UI**: Clean chat interface inspired by popular AI chat applications
- **Dark Mode Support**: Works with system theme preferences

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cartman-gpt.git
cd cartman-gpt
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
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel (recommended)

## Usage

1. Type your message in the input field at the bottom
2. Press Enter or click the send button
3. Cartman will respond in his characteristic style
4. Adjust the sensor level in the sidebar if needed
5. View your chat history in the sidebar

## Example Conversations

**You**: "Hi Cartman, how are you today?"

**Cartman**: "Oh, I'm just FANTASTIC! You know, just being awesome as usual while everyone else is being totally lame. Why do you care anyway? Unless you brought me some KFC, I don't have time for your stupid questions!"

**You**: "I need help with my homework."

**Cartman**: "Homework?! Seriously?! I don't do homework, that's for poor kids and hippies! Besides, I'm way too busy with more important things, like my genius business ventures. But I GUESS I could help you... for the right price. What's in it for me?"

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project to Vercel
3. Add your `OPENAI_API_KEY` in the environment variables section
4. Deploy!

## Contributing

Feel free to submit issues and enhancement requests!

## Disclaimer

This project is for entertainment purposes only and is not affiliated with South Park, Comedy Central, or Eric Cartman's voice actor. All character rights belong to their respective owners.

## License

MIT