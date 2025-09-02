# ToneChanger - AI-Powered Text Tone Transformation (Fiddle Assignment by Apurv)

Transform any text to match different tones using AI - from professional to casual, formal to friendly. Built with Next.js and powered by Mistral AI.

##  Features

-  **Multiple Tone Options** - Professional, casual, formal, friendly, and more
-  **Smart Text Selection** - Transform selected text or entire documents
-  **Real-time Processing** - Powered by Mistral AI's language model
-  **History Management** - Track your text transformations
-  **Clean Interface** - Intuitive design for seamless workflow
-  **Undo/Redo Support** - Easily revert changes
-  **Responsive Design** - Design the updates to your screen size

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Mistral AI API
- **UI Components**: Shadcn/ui, Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Mistral AI API key ([Get one here](https://console.mistral.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone github.com/ApurvP13/fiddle
   cd tonechanger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Mistral API key:
   ```env
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [Live Link](fiddle-apurv.vercel.app) to see the application.

## 📖 Usage

1. **Add Text**: Type or paste your text into the main text area
2. **Select Tone**: Choose from available tone options
3. **Transform**: Click on a tone to transform your entire text, or select specific text to transform only that portion
4. **Review**: The AI will rewrite your text to match the selected tone while preserving the original meaning

### Available Tones

- Professional (Consice and Expanded)
- Casual (Consice and Expanded)
- Balanced


## 🔧 API Documentation

### POST `/api/ToneChanger`

Transform text tone using Mistral AI.

**Request Body:**
```json
{
  "text": "Your text to transform",
  "toneId": "professional-casual",
  "selection": { "start": 0, "end": 10 } // optional
}
```

**Response:**
```json
{
  "result": "Transformed text with new tone"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ToneChanger/
│   │       └── route.ts          # Mistral AI API integration
│   ├── components/
│   │   ├── ui/                   # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── textarea.tsx
│   │   ├── TextEditor.tsx        # Main text editor component
│   │   └── ToneMatrix.tsx        # Tone selection interface
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── .env.local                    # Environment variables (create this)
└── ...
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MISTRAL_API_KEY` | Your Mistral AI API key | Yes |

## 🐛 Troubleshooting

### Common Issues

**"Mistral API key not configured"**
- Ensure your `.env.local` file exists and contains the correct API key
- Restart the development server after adding environment variables

**"Failed to change tone"**
- Check your internet connection
- Verify your Mistral API key is valid and has sufficient credits
- Check the browser console for detailed error messages

**Text not transforming**
- Ensure you have text selected or entered
- Try with different tone options
- Check if the text is too short (minimum recommended: 5+ words)




Built with ❤️ using Next.js and Mistral AI by Apurv Pandey
