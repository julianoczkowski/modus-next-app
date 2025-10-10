"use client";

import { useState, useCallback } from "react";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
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
            <div className="text-base leading-relaxed mb-4">
              This is a comprehensive guide to help you get started with our
              platform. We&apos;ll cover everything from basic setup to advanced
              features.
            </div>
            <div className="flex gap-2">
              <ModusWcButton
                color="primary"
                size="sm"
                onButtonClick={() => logEvent("Getting Started button clicked")}
              >
                Start Tutorial
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                size="sm"
                onButtonClick={() => logEvent("Documentation button clicked")}
              >
                View Docs
              </ModusWcButton>
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
                  <div className="font-medium">Dashboard</div>
                </div>
                <div className="text-sm text-foreground opacity-80">
                  Comprehensive analytics and reporting tools
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">settings</i>
                  <div className="font-medium">Settings</div>
                </div>
                <div className="text-sm text-foreground opacity-80">
                  Customize your experience and preferences
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">people_group</i>
                  <div className="font-medium">Team Management</div>
                </div>
                <div className="text-sm text-foreground opacity-80">
                  Collaborate with your team effectively
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="modus-icons text-primary">security</i>
                  <div className="font-medium">Security</div>
                </div>
                <div className="text-sm text-foreground opacity-80">
                  Enterprise-grade security features
                </div>
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
                <div className="text-sm text-foreground space-y-2 mb-6">
                  <div>✓ Basic features</div>
                  <div>✓ Community support</div>
                  <div>✓ 1GB storage</div>
                </div>
                <ModusWcButton
                  color="primary"
                  fullWidth={true}
                  onButtonClick={() => logEvent("Free plan selected")}
                >
                  Get Started
                </ModusWcButton>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-center border-primary">
                <div className="text-2xl font-bold mb-2">Pro</div>
                <div className="text-4xl font-bold text-primary mb-4">$29</div>
                <div className="text-sm text-foreground space-y-2 mb-6">
                  <div>✓ All basic features</div>
                  <div>✓ Priority support</div>
                  <div>✓ 100GB storage</div>
                  <div>✓ Advanced analytics</div>
                </div>
                <ModusWcButton
                  color="primary"
                  fullWidth={true}
                  onButtonClick={() => logEvent("Pro plan selected")}
                >
                  Choose Pro
                </ModusWcButton>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="text-2xl font-bold mb-2">Enterprise</div>
                <div className="text-4xl font-bold text-primary mb-4">$99</div>
                <div className="text-sm text-foreground space-y-2 mb-6">
                  <div>✓ Everything in Pro</div>
                  <div>✓ 24/7 support</div>
                  <div>✓ Unlimited storage</div>
                  <div>✓ Custom integrations</div>
                </div>
                <ModusWcButton
                  color="primary"
                  fullWidth={true}
                  onButtonClick={() => logEvent("Enterprise plan selected")}
                >
                  Contact Sales
                </ModusWcButton>
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
                    <div className="font-medium">Documentation</div>
                  </div>
                  <div className="text-sm text-foreground opacity-80 mb-3">
                    Comprehensive guides and API references
                  </div>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    size="sm"
                    onButtonClick={() => logEvent("Documentation accessed")}
                  >
                    Browse Docs →
                  </ModusWcButton>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">chat</i>
                    <div className="font-medium">Live Chat</div>
                  </div>
                  <div className="text-sm text-foreground opacity-80 mb-3">
                    Get instant help from our support team
                  </div>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    size="sm"
                    onButtonClick={() => logEvent("Live chat started")}
                  >
                    Start Chat →
                  </ModusWcButton>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">email</i>
                    <div className="font-medium">Email Support</div>
                  </div>
                  <div className="text-sm text-foreground opacity-80 mb-3">
                    support@example.com
                  </div>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    size="sm"
                    onButtonClick={() => logEvent("Email support contacted")}
                  >
                    Send Email →
                  </ModusWcButton>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="modus-icons text-primary">phone</i>
                    <div className="font-medium">Phone Support</div>
                  </div>
                  <div className="text-sm text-foreground opacity-80 mb-3">
                    +1 (555) 123-4567
                  </div>
                  <ModusWcButton
                    color="primary"
                    variant="borderless"
                    size="sm"
                    onButtonClick={() => logEvent("Phone support called")}
                  >
                    Call Now →
                  </ModusWcButton>
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
                <div className="text-sm text-foreground opacity-80">
                  Simply sign up for an account and follow our onboarding
                  process. We&apos;ll guide you through each step.
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Is there a free trial?</div>
                <div className="text-sm text-foreground opacity-80">
                  Yes! We offer a 14-day free trial with full access to all
                  features. No credit card required.
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Can I cancel anytime?</div>
                <div className="text-sm text-foreground opacity-80">
                  Absolutely. You can cancel your subscription at any time from
                  your account settings.
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="font-medium mb-2">Do you offer refunds?</div>
                <div className="text-sm text-foreground opacity-80">
                  We offer a 30-day money-back guarantee for all paid plans.
                </div>
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
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore the powerful accordion component with interactive examples,
          event handling, and various content types. This demonstrates both
          basic usage and advanced features of the Modus accordion.
        </div>
      </div>

      {/* Basic Accordion Example */}
      <div className="mb-12 p-8 bg-card rounded-lg border border-border">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Interactive Accordion
        </div>
        <div className="text-base mb-6 text-foreground">
          Click on any accordion item to expand/collapse it. The accordion
          coordinates the state of all items and provides event notifications.
        </div>

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
        <div className="text-base mb-6 text-foreground">
          This section shows real-time events from the accordion interactions.
          Expand/collapse items above to see the events logged here.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-lg font-medium mb-4 text-foreground">
              Accordion Events:
            </div>
            <div className="max-h-64 overflow-y-auto border border-border rounded p-4 bg-background">
              {eventLogs.map((log, index) => (
                <div key={index} className="flex gap-4 mb-2 font-mono text-sm">
                  <div className="text-foreground min-w-20">
                    {log.timestamp}
                  </div>
                  <div className="text-foreground">{log.message}</div>
                </div>
              ))}
              {eventLogs.length === 0 && (
                <div className="text-foreground italic text-center p-8">
                  Interact with the accordion above to see events logged here...
                </div>
              )}
            </div>
            <ModusWcButton
              color="secondary"
              size="sm"
              onButtonClick={clearLogs}
              disabled={eventLogs.length === 0}
            >
              <i className="modus-icons mr-2">delete</i>
              Clear Logs
            </ModusWcButton>
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
            <div className="bg-background border border-border rounded p-4 overflow-x-auto font-mono text-sm text-foreground">
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
            </div>
          </div>

          <div>
            <div className="text-lg font-medium mb-2 text-foreground">
              With Event Handling:
            </div>
            <div className="bg-background border border-border rounded p-4 overflow-x-auto font-mono text-sm text-foreground">
              {`<ModusAccordion
  items={accordionItems}
  onExpandedChange={(event) => {
    console.log('Item', event.index, 'is', event.expanded ? 'open' : 'closed');
  }}
/>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
