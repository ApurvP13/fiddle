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

## Technical Architecture & Design Decisions
   ### Architecture Overview
   This application follows a client-server architecture with Next.js handling both frontend and API routing. The core design prioritizes simplicity and user experience over complex state management patterns.
### Key Technical Decisions
1.**Next.js API Routes vs External Backend**

Decision: Used Next.js API routes for the Mistral AI integration
Rationale: Simplified deployment, reduced infrastructure complexity, and faster development
Trade-off: Less flexibility for scaling backend logic independently, but acceptable for this scope

2. **Client-Side State Management**

Decision: Used React's built-in useState instead of Redux/Zustand
Rationale: Application state is relatively simple and doesn't require complex data flow
Trade-off: May need refactoring if state complexity grows significantly

3. **Mistral AI Model Selection**

Decision: Chose mistral-small-latest model
Rationale: Balance between cost efficiency and quality for text transformation tasks
Trade-off: Could use larger models for better quality, but at higher API costs

### State Management
The application manages state through several React hooks:
```
const [text, setText] = useState<string>('');           // Main text content
const [history, setHistory] = useState<string[]>([]);   // Undo history stack
const [selection, setSelection] = useState({...});      // Text selection tracking
const [loading, setLoading] = useState<boolean>(false); // API call states
```

### Undo/Redo Implementation:

History Stack: Each text change pushes current state to history array
Undo Logic: Pops from history stack and restores previous state
Memory Management: Could implement history limit to prevent memory leaks in extended sessions
Selection Preservation: Maintains cursor position after undo operations

Trade-off: Simple array-based history vs more sophisticated solutions like Command Pattern. Chose simplicity for MVP scope.

### Error Handling Strategy
1. API Level Error Handling

```
// Comprehensive error catching in route.ts
- Validates request parameters
- Handles Mistral API failures gracefully  
- Returns structured error responses with appropriate HTTP codes
```
2. Client-Side Error Handling
```
// User-friendly error presentation
- Toast notifications for user feedback
- Graceful degradation when API fails
- Loading states prevent multiple simultaneous requests
```
3. Edge Cases Addressed
```
Empty Text: Validates text input before API calls
Network Failures: Timeout handling and retry logic
Invalid API Keys: Clear error messages for configuration issues
Selection Edge Cases: Handles text selection boundary conditions
Concurrent Requests: Loading states prevent race conditions
```
4. Input Validation
```
Text Length: Prevents extremely long texts that could cause API timeouts
Selection Bounds: Validates text selection indices
Tone ID Format: Ensures valid tone identifiers
```
### Performance Considerations
1. **API Optimization**

- Only sends selected text portion when user selects specific text (token savings)
- Implements loading states to prevent duplicate requests
- Could add debouncing for rapid tone changes (future enhancement)

2. **Memory Management**

History array could grow indefinitely - should implement size limits
Text transformations stored in memory only (no persistence trade-off for simplicity)

### Security Considerations

API Key Protection: Environment variables prevent client-side exposure
Input Sanitization: Prevents injection attacks through text input
CORS Configuration: API routes properly configured for same-origin requests

### Scalability Trade-offs
Current Approach: Optimized for development speed and simplicity
Future Considerations:
- Could implement caching for repeated transformations
- Database persistence for user sessions
- Rate limiting for API protection
- WebSocket connections for real-time collaboration



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




Built with ❤️ using Next.js and Mistral AI by Apurv Pandey for Fiddle
