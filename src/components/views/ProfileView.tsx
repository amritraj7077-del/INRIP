import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ProfileViewProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onShowToast: (title: string, description?: string) => void;
}

export const ProfileView = ({ isDarkMode, onToggleDarkMode, onShowToast }: ProfileViewProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-4 bg-card border border-border/80 rounded-3xl p-6 shadow-xl">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          IN
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">INRIP Enterprise User</h1>
            <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[10px]">
              Active SaaS License
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">user@inrip.gov.in • Senior GIS Analyst</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Account Settings</h3>
        <div className="p-4 rounded-2xl border border-border/80 bg-card space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span>Theme Preference</span>
            <Button size="sm" variant="outline" onClick={onToggleDarkMode} className="rounded-xl">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>API Token Access</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onShowToast('API Key', 'INRIP API Token copied to clipboard.')}
              className="rounded-xl"
            >
              Copy API Token
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
