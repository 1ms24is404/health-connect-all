import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  Gamepad2, 
  BookOpen,
  Wifi,
  WifiOff,
  Sparkles,
  Trophy,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickTopics = [
  { icon: Heart, label: "Heart Health", query: "Tell me about maintaining heart health" },
  { icon: Sparkles, label: "Nutrition", query: "What are healthy eating habits?" },
  { icon: BookOpen, label: "Diabetes", query: "How can I prevent diabetes?" },
  { icon: Trophy, label: "Exercise", query: "What exercises are good for beginners?" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
];

const mockResponses: Record<string, string> = {
  "heart": "**Heart Health Tips:**\n\n1. **Exercise Regularly** - Aim for 150 minutes of moderate activity weekly\n2. **Eat Heart-Healthy Foods** - Include fruits, vegetables, whole grains, and lean proteins\n3. **Manage Stress** - Practice meditation or deep breathing\n4. **Quit Smoking** - Smoking increases heart disease risk significantly\n5. **Monitor Blood Pressure** - Keep it below 120/80 mmHg\n\n🎮 **Unlock Achievement:** Complete a heart health quiz to earn points!",
  "nutrition": "**Healthy Eating Guidelines:**\n\n• **Fill half your plate** with fruits and vegetables\n• **Choose whole grains** over refined grains\n• **Limit processed foods** and added sugars\n• **Stay hydrated** - drink 8 glasses of water daily\n• **Practice portion control**\n\n📊 **Your Progress:** You've learned about 2/10 nutrition topics!",
  "diabetes": "**Diabetes Prevention:**\n\n1. **Maintain Healthy Weight** - Losing 5-7% of body weight reduces risk\n2. **Stay Active** - Physical activity helps control blood sugar\n3. **Choose Fiber-Rich Foods** - Helps stabilize glucose levels\n4. **Limit Sugar Intake** - Reduce sugary beverages and snacks\n5. **Regular Checkups** - Monitor blood glucose annually\n\n⚠️ **Risk Factors:** Family history, obesity, sedentary lifestyle",
  "exercise": "**Beginner Exercise Guide:**\n\n**Week 1-2:**\n- 10-minute walks daily\n- Simple stretching\n\n**Week 3-4:**\n- 20-minute brisk walks\n- Basic bodyweight exercises\n\n**Week 5+:**\n- 30-minute cardio sessions\n- Add strength training\n\n💪 **Challenge:** Complete 7 consecutive days of exercise to unlock the 'Consistency Champion' badge!",
  "default": "I'm your AI health assistant! I can help you learn about:\n\n• **Disease Prevention** - Tips to stay healthy\n• **Nutrition** - Healthy eating habits\n• **Exercise** - Physical activity guidance\n• **Mental Wellness** - Stress management\n\nAsk me anything about health, and I'll provide evidence-based information. Remember: This is educational content and doesn't replace professional medical advice."
};

export default function DiseaseAwareness() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Welcome to HealthBridge! I'm your AI health education assistant. I can help you learn about various diseases, prevention strategies, and healthy lifestyle habits.\n\n**What would you like to learn about today?**\n\nYou can ask me questions or select a topic below to get started!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [points, setPoints] = useState(150);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerContent = content.toLowerCase();
    let response = mockResponses.default;
    
    for (const [key, value] of Object.entries(mockResponses)) {
      if (lowerContent.includes(key)) {
        response = value;
        break;
      }
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
    setPoints((prev) => prev + 10);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health-teal-light text-health-teal text-sm font-medium mb-4">
              <Bot className="h-4 w-4" />
              Disease Awareness Chatbot
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Learn About Health
            </h1>
            <p className="text-muted-foreground">
              AI-powered health education with gamified learning
            </p>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 health-card">
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Connection Status */}
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                  isOnline
                    ? "bg-health-success-light text-health-success"
                    : "bg-health-amber-light text-health-amber"
                )}
              >
                {isOnline ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    Offline Mode
                  </>
                )}
              </div>
            </div>

            {/* Gamification Points */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-health-amber-light text-health-amber">
              <Gamepad2 className="h-4 w-4" />
              <span className="text-sm font-semibold">{points} Points</span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="health-card overflow-hidden">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-slide-up",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    )}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                          {line.replace(/\*\*/g, '')}
                        </p>
                      ))}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Topics */}
            <div className="border-t border-border p-4">
              <p className="text-xs text-muted-foreground mb-3">Quick Topics:</p>
              <div className="flex flex-wrap gap-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => sendMessage(topic.query)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <topic.icon className="h-3 w-3" />
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any health topic..."
                  className="health-input flex-1"
                />
                <Button type="submit" variant="teal" size="icon" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
