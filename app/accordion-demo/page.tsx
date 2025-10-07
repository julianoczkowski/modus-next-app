"use client";

import { useState, useCallback } from "react";
import ModusAccordion from "../components/ModusAccordion";

interface EventLog {
  timestamp: string;
  message: string;
}

export default function AccordionDemoPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set()); // Track expanded items

  // Event logging function
  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLogs((prev) => {
      const newLogs = [{ timestamp, message }, ...prev];
      return newLogs.slice(0, 15); // Keep only last 15 logs
    });
  }, []);

  const handleExpandedChange = useCallback(
    (event: { expanded: boolean; index: number }) => {
      const { expanded, index } = event;
      logEvent(`Item ${index + 1} ${expanded ? "expanded" : "collapsed"}`);

      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (expanded) {
          newSet.add(index);
        } else {
          newSet.delete(index);
        }
        return newSet;
      });
    },
    [logEvent]
  );

  const clearLogs = () => {
    setEventLogs([]);
  };

  // Accordion items data
  const accordionItems = [
    {
      id: "getting-started",
      options: {
        title: "Getting Started",
        description: "Learn the basics of our platform",
        icon: "help",
        size: "md" as const,
      },
      bordered: true,
      content: (
        <div className="p-4">
          <div className="text-foreground mb-4">
            <div className="text-lg font-semibold mb-2">
              Welcome to our platform!
            </div>
            <p className="text-base leading-relaxed mb-4">
              This is a comprehensive guide to help you get started with our
              platform. We'll cover everything from basic setup to advanced
              features.
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                onClick={() => logEvent("Getting Started button clicked")}
              >
                Start Tutorial
              </button>
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
                onClick={() => logEvent("Documentation button clicked")}
              >
                View Docs
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "features",
      options: {
        title: "Features",
        description: "Explore our powerful features",
        icon: "apps",
        size: "md" as const,
      },
      bordered: true,
      content: (
        <div className="p-4">
          <div className="text-foreground">
            <div className="text-lg font-semibold mb-4">Available Features</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">dashboard</i>
                  <span className="font-medium">Dashboard</span>
                </div>
                <p className="text-sm text-foreground opacity-80">
                  Comprehensive analytics and reporting tools
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">settings</i>
                  <span className="font-medium">Settings</span>
                </div>
                <p className="text-sm text-foreground opacity-80">
                  Customize your experience and preferences
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">people_group</i>
                  <span className="font-medium">Team Management</span>
                </div>
                <p className="text-sm text-foreground opacity-80">
                  Collaborate with your team effectively
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">security</i>
                  <span className="font-medium">Security</span>
                </div>
                <p className="text-sm text-foreground opacity-80">
                  Enterprise-grade security features
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pricing",
      options: {
        title: "Pricing",
        description: "Choose the plan that's right for you",
        icon: "credit_card",
        size: "md" as const,
      },
      bordered: true,
      content: (
        <div className="p-4">
          <div className="text-foreground">
            <div className="text-lg font-semibold mb-4">Pricing Plans</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-2xl font-bold mb-2">Free</div>
                <div className="text-4xl font-bold text-primary mb-4">$0</div>
                <ul className="text-sm text-foreground space-y-2 mb-6">
                  <li>✓ Basic features</li>
                  <li>✓ Community support</li>
                  <li>✓ 1GB storage</li>
                </ul>
                <button
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  onClick={() => logEvent("Free plan selected")}
                >
                  Get Started
                </button>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-center border-primary">
                <div className="text-2xl font-bold mb-2">Pro</div>
                <div className="text-4xl font-bold text-primary mb-4">$29</div>
                <ul className="text-sm text-foreground space-y-2 mb-6">
                  <li>✓ All basic features</li>
                  <li>✓ Priority support</li>
                  <li>✓ 100GB storage</li>
                  <li>✓ Advanced analytics</li>
                </ul>
                <button
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  onClick={() => logEvent("Pro plan selected")}
                >
                  Choose Pro
                </button>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-2xl font-bold mb-2">Enterprise</div>
                <div className="text-4xl font-bold text-primary mb-4">$99</div>
                <ul className="text-sm text-foreground space-y-2 mb-6">
                  <li>✓ Everything in Pro</li>
                  <li>✓ 24/7 support</li>
                  <li>✓ Unlimited storage</li>
                  <li>✓ Custom integrations</li>
                </ul>
                <button
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  onClick={() => logEvent("Enterprise plan selected")}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "support",
      options: {
        title: "Support",
        description: "Get help when you need it",
        icon: "headset",
        size: "md" as const,
      },
      bordered: true,
      content: (
        <div className="p-4">
          <div className="text-foreground">
            <div className="text-lg font-semibold mb-4">
              How can we help you?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">help</i>
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-sm text-foreground opacity-80 mb-3">
                    Comprehensive guides and API references
                  </p>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => logEvent("Documentation accessed")}
                  >
                    Browse Docs →
                  </button>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">chat</i>
                    <span className="font-medium">Live Chat</span>
                  </div>
                  <p className="text-sm text-foreground opacity-80 mb-3">
                    Get instant help from our support team
                  </p>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => logEvent("Live chat started")}
                  >
                    Start Chat →
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">email</i>
                    <span className="font-medium">Email Support</span>
                  </div>
                  <p className="text-sm text-foreground opacity-80 mb-3">
                    support@example.com
                  </p>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => logEvent("Email support contacted")}
                  >
                    Send Email →
                  </button>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">phone</i>
                    <span className="font-medium">Phone Support</span>
                  </div>
                  <p className="text-sm text-foreground opacity-80 mb-3">
                    +1 (555) 123-4567
                  </p>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => logEvent("Phone support called")}
                  >
                    Call Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      options: {
        title: "FAQ",
        description: "Frequently asked questions",
        icon: "help_outlined",
        size: "md" as const,
      },
      bordered: true,
      content: (
        <div className="p-4">
          <div className="text-foreground">
            <div className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">How do I get started?</div>
                <p className="text-sm text-foreground opacity-80">
                  Simply sign up for an account and follow our onboarding
                  process. We'll guide you through each step.
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Is there a free trial?</div>
                <p className="text-sm text-foreground opacity-80">
                  Yes! We offer a 14-day free trial with full access to all
                  features. No credit card required.
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Can I cancel anytime?</div>
                <p className="text-sm text-foreground opacity-80">
                  Absolutely. You can cancel your subscription at any time from
                  your account settings.
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Do you offer refunds?</div>
                <p className="text-sm text-foreground opacity-80">
                  We offer a 30-day money-back guarantee for all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Accordion Demo
        </div>
        <p className="text-lg leading-relaxed text-foreground text-center">
          Explore the powerful accordion component with interactive examples,
          event handling, and various content types. This demonstrates both
          basic usage and advanced features of the Modus accordion.
        </p>
      </div>

      {/* Basic Accordion Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Accordion
        </div>
        <p className="text-base mb-6 text-foreground">
          Click on any accordion item to expand/collapse it. The accordion
          coordinates the state of all items and provides event notifications.
        </p>

        <ModusAccordion
          items={accordionItems}
          onExpandedChange={handleExpandedChange}
          className="mb-6"
        />
      </div>

      {/* Event Logging Demo */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Event Logging
        </div>
        <p className="text-base mb-6 text-foreground">
          This section shows real-time events from the accordion interactions.
          Expand/collapse items above to see the events logged here.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium mb-4 text-foreground">
              Accordion Events:
            </div>
            <div className="max-h-64 overflow-y-auto border border-border rounded p-4 bg-background">
              {eventLogs.map((log, index) => (
                <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
                  <span className="text-foreground min-w-20">
                    {log.timestamp}
                  </span>
                  <span className="text-foreground">{log.message}</span>
                </div>
              ))}
              {eventLogs.length === 0 && (
                <div className="text-foreground italic text-center p-8">
                  Interact with the accordion above to see events logged here...
                </div>
              )}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              onClick={clearLogs}
              disabled={eventLogs.length === 0}
            >
              <i className="modus-icons mr-2">delete</i>
              Clear Logs
            </button>
          </div>

          <div>
            <div className="text-lg font-medium mb-4 text-foreground">
              Current State:
            </div>
            <div className="p-4 bg-background border border-border rounded">
              <div className="text-sm text-foreground mb-2">
                <strong>Expanded Items:</strong>{" "}
                {Array.from(expandedItems)
                  .map((i) => i + 1)
                  .join(", ") || "None"}
              </div>
              <div className="text-sm text-foreground mb-2">
                <strong>Total Items:</strong> {accordionItems.length}
              </div>
              <div className="text-sm text-foreground">
                <strong>Events Logged:</strong> {eventLogs.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Usage Examples
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-lg font-medium mb-2 text-foreground">
              Basic Accordion:
            </div>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto font-mono text-sm text-foreground">
              {`<ModusAccordion
  items={[
    {
      id: "item1",
      options: {
        title: "Item One",
        description: "First accordion item",
        icon: "star"
      },
      content: <div>Content for item one</div>
    }
  ]}
/>`}
            </pre>
          </div>

          <div>
            <div className="text-lg font-medium mb-2 text-foreground">
              With Event Handling:
            </div>
            <pre className="bg-background border border-border rounded p-4 overflow-x-auto font-mono text-sm text-foreground">
              {`<ModusAccordion
  items={accordionItems}
  onExpandedChange={(event) => {
    console.log('Item', event.index, 'is', event.expanded ? 'open' : 'closed');
  }}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
