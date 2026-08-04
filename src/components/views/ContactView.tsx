import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ContactViewProps {
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning') => void;
}

export const ContactView = ({ onShowToast }: ContactViewProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-2">
          <Mail className="h-7 w-7 text-primary" />
          Contact INRIP Intelligence Team
        </h1>
        <p className="text-sm text-muted-foreground">
          Reach out for institutional API access, custom GIS dataset integrations, or enterprise support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-foreground">Get In Touch</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-muted-foreground block">Email Support</span>
                <span className="font-semibold text-foreground">enterprise@inrip.gov.in</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="text-muted-foreground block">Headquarters</span>
                <span className="font-semibold text-foreground">INRIP Resource Center, New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onShowToast('Enquiry Sent', 'Thank you! Our GIS analyst team will respond within 24 hours.', 'success');
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name</label>
            <Input placeholder="Dr. Rajesh Sharma" required className="rounded-xl text-xs h-10" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Work Email</label>
            <Input type="email" placeholder="r.sharma@mining.org" required className="rounded-xl text-xs h-10" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Message / Request</label>
            <textarea
              placeholder="Inquire about dataset API export or commercial lease valuation..."
              rows={3}
              required
              className="w-full rounded-xl border border-input bg-transparent p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button type="submit" className="w-full rounded-xl text-xs font-bold py-5 shadow-lg gap-2">
            <Send className="h-3.5 w-3.5" />
            Send Enquiry
          </Button>
        </form>
      </div>
    </div>
  );
};
