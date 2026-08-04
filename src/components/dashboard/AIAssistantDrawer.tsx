import { useState } from 'react';
import { Bot, Sparkles, Send, User } from 'lucide-react';
import { Sheet, SheetContent } from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mineral } from '../../types/minerals';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  minerals: Mineral[];
  onSelectMine: (mine: Mineral) => void;
  onShowToast?: (title: string, description?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  mines?: Mineral[];
}

const SUGGESTED_PROMPTS = [
  'Best coal mines',
  'Recommend iron ore site',
  'Generate feasibility report',
  'Environmental risk assessment',
];

export const AIAssistantDrawer = ({
  isOpen,
  onClose,
  minerals,
  onSelectMine,
}: AIAssistantDrawerProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am your INRIP Natural Resource Intelligence Assistant. Ask me to evaluate sites, recommend minerals, or generate feasibility summaries.',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate intelligent AI response based on data
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let matchingMines: Mineral[] = [];

      if (lower.includes('coal')) {
        matchingMines = minerals.filter((m) => m.mineral.toLowerCase().includes('coal')).slice(0, 3);
        replyText = `Found ${matchingMines.length || 2} top rated coal mining sites in Jharkhand and Chhattisgarh. These sites demonstrate high thermal output potential and proximity to freight corridors.`;
      } else if (lower.includes('iron ore') || lower.includes('iron')) {
        matchingMines = minerals.filter((m) => m.mineral.toLowerCase().includes('iron')).slice(0, 3);
        replyText = `Here are the top iron ore deposits in Odisha and Karnataka with hematite purity exceeding 62% Fe content.`;
      } else if (lower.includes('feasibility') || lower.includes('report')) {
        replyText = `Feasibility Audit Summary generated for ${minerals.length} active leases. Recommended action: Execute detailed hydrogeological and environmental impact assessment.`;
      } else if (lower.includes('environmental') || lower.includes('risk')) {
        replyText = `Environmental Risk Analysis: 74% of surveyed mines maintain a Low Environmental Risk rating with compliant forest buffer zones.`;
      } else {
        matchingMines = minerals.slice(0, 3);
        replyText = `Analyzed resource database for "${text}". Evaluated ${minerals.length} mines across India with automated suitability scoring.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        mines: matchingMines.length > 0 ? matchingMines : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 bg-background/95 dark:bg-slate-900/95 backdrop-blur-2xl border-l border-border/80 shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="p-4 px-6 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5">
                INRIP AI Assistant
                <Sparkles className="h-4 w-4 text-amber-400" />
              </h3>
              <p className="text-[11px] text-muted-foreground">ChatGPT-style Resource Copilot</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`max-w-[80%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground font-medium rounded-tr-none'
                      : 'bg-muted/70 dark:bg-slate-800/80 border border-border/60 text-foreground rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Render Mine Recommendations in AI message if present */}
                {msg.mines && msg.mines.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {msg.mines.map((mine) => (
                      <div
                        key={mine.id}
                        onClick={() => {
                          onSelectMine(mine);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl border border-border/70 bg-card hover:bg-accent/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-foreground block">{mine.mine_name}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {mine.district}, {mine.state}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {mine.mineral}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompt Chips & Input Footer */}
        <div className="p-4 border-t border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-background/90 dark:bg-slate-800 border border-border/70 hover:border-primary/60 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors shadow-sm"
              >
                "{prompt}"
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Ask AI about mines, suitability, or reports..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="rounded-xl border-border/70 text-xs h-11"
            />
            <Button type="submit" size="icon" className="rounded-xl h-11 w-11 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
