import React from 'react';

/**
 * Quiet ambient automation visual used behind every route.
 * It intentionally stays low-contrast so it adds depth without competing with page content.
 */
export const AutomationAtmosphere: React.FC = () => (
  <div className="automation-atmosphere" aria-hidden="true">
    <div className="automation-atmosphere__glow automation-atmosphere__glow--one" />
    <div className="automation-atmosphere__glow automation-atmosphere__glow--two" />
    <div className="automation-atmosphere__terminal">
      <div className="automation-atmosphere__bar">
        <div className="automation-atmosphere__dots"><i /><i /><i /></div>
        <span>flowlym-orchestrator.ts</span>
        <span className="automation-atmosphere__status">LIVE</span>
      </div>
      <div className="automation-atmosphere__code">
        <p><b>const</b> workflow = <em>new AutomationWorkflow</em>({'{'}</p>
        <p>&nbsp;&nbsp;source: <strong>'hubspot.lead_submitted'</strong>,</p>
        <p>&nbsp;&nbsp;aiModel: <strong>'structured AI model'</strong>,</p>
        <p>&nbsp;&nbsp;retryPolicy: <em>RetryHandler</em>({'{'} maxRetries: 5 {'}'})</p>
        <p>{'}'});</p>
        <br />
        <p><b>await</b> workflow.dispatch({'{'}</p>
        <p>&nbsp;&nbsp;enrichWith: [<strong>'WhatsApp'</strong>, <strong>'GoogleDrive'</strong>, <strong>'Stripe'</strong>],</p>
        <p>&nbsp;&nbsp;status: <strong>'STATUS: COMPLETED'</strong></p>
        <p>{'}'});</p>
      </div>
      <div className="automation-atmosphere__footer">
        <span><i /> FLOWLYM Engine</span>
        <span>Latency: 140ms</span>
      </div>
    </div>
  </div>
);
