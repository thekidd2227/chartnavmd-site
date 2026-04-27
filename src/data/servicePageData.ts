export interface ServicePoint {
  title: string;
  description: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicePageData {
  slug: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; h1: string; intro: string };
  problem: { headline: string; body: string; points: string[] };
  system: { headline: string; body: string; items: ServicePoint[] };
  outcome: { headline: string; metrics: ServiceMetric[] };
  implementation: { headline: string; steps: ServiceStep[] };
  cta: { headline: string; body: string };
  relatedLinks: { label: string; href: string }[];
}

export const servicePages: Record<string, ServicePageData> = {

  "ai-automation-for-small-business": {
    slug: "ai-automation-for-small-business",
    seo: {
      title: "AI Automation for Small Business | ARCG Systems",
      description: "Stop managing leads and follow-up manually. ARCG builds AI-powered workflow systems for small businesses — intake, response, routing, and reporting on autopilot.",
    },
    hero: {
      eyebrow: "AI Automation · Small Business",
      h1: "AI Automation Built for Small Business Operations",
      intro: "Most small businesses are managing lead intake, follow-up, scheduling, and reporting manually — one email, one call, one spreadsheet at a time. ARCG builds AI-powered workflow systems that handle those processes automatically, so your team focuses on delivery, not coordination.",
    },
    problem: {
      headline: "The Manual Coordination Problem Is Costing More Than You Think",
      body: "Small businesses at growth stage typically share the same failure pattern: leads arrive through multiple channels, responses happen when someone has time, follow-up is inconsistent, and status lives in someone's head or a spreadsheet. The cost is not just inefficiency — it compounds. Every slow response is a lost opportunity. Every manual handoff is a potential error. Every hour spent on coordination is an hour not spent on the work that generates revenue.",
      points: [
        "Inquiries go unanswered after hours or over weekends",
        "Lead follow-up depends on who's available, not a system",
        "No centralized view of where every opportunity stands",
        "Reporting requires manual data compilation each week",
        "Team coordination happens over text and email instead of structured workflow",
      ],
    },
    system: {
      headline: "An AI-Powered Workflow That Runs Whether You're Watching or Not",
      body: "ARCG builds end-to-end automation systems tailored to how your business actually operates — not off-the-shelf templates, but custom-configured systems that connect your intake channels, automate your responses, route your leads, and capture your operational data automatically.",
      items: [
        { title: "Unified Intake", description: "All inquiry channels — web form, email, text, social — captured into a single intake system with automatic categorization and routing." },
        { title: "AI-Powered Response", description: "Instant, personalized acknowledgment and follow-up sequences triggered by lead behavior, not manual action." },
        { title: "Workflow Routing", description: "Leads and tasks automatically assigned to the right person based on type, territory, or service category." },
        { title: "Automated Reporting", description: "Operational data captured at every stage and compiled automatically into weekly status views — no manual spreadsheet work." },
      ],
    },
    outcome: {
      headline: "What Changes After the System Is Built",
      metrics: [
        { value: "< 5 min", label: "Response Time", description: "AI-triggered responses fire within minutes of intake regardless of time of day." },
        { value: "100%", label: "Lead Capture", description: "Every inquiry enters the system — no contacts lost from missed messages or delayed manual entry." },
        { value: "~90%", label: "Coordination Reduction", description: "Most manual coordination and status-chasing replaced by automated routing and notifications." },
      ],
    },
    implementation: {
      headline: "How ARCG Builds Your System",
      steps: [
        { step: "01", title: "Intake & Discovery", description: "Complete the intake form to identify your highest-cost manual processes and the automation opportunities with the most immediate impact." },
        { step: "02", title: "System Design", description: "ARCG maps your intake, routing, and reporting flows — selecting the right tools and connection points for your specific operation." },
        { step: "03", title: "Build & Configure", description: "We build the system end-to-end: integrations, automations, templates, and dashboards. You review and approve each component before it goes live." },
        { step: "04", title: "Handoff & Documentation", description: "Full handoff with documentation, training, and a 30-day check-in to verify performance and address any edge cases." },
      ],
    },
    cta: {
      headline: "Find Out Where Your Automation Should Start",
      body: "Complete the intake form and receive a custom AI-generated report identifying your three highest-impact automation opportunities with a recommended build order.",
    },
    relatedLinks: [
      { label: "AI automation consulting", href: "/ai-automation" },
      { label: "workflow automation", href: "/operational-workflow-automation" },
    ],
  },

  "operational-workflow-automation": {
    slug: "operational-workflow-automation",
    seo: {
      title: "Operational Workflow Automation | ARCG Systems",
      description: "Replace manual coordination with automated workflows. ARCG designs and deploys operational workflow systems that eliminate bottlenecks, reduce coordination errors, and scale with your operation.",
    },
    hero: {
      eyebrow: "Workflow Automation",
      h1: "Operational Workflow Automation That Eliminates the Manual Bottleneck",
      intro: "Manual handoffs, status-chasing, and coordination gaps are structural failures that cap your capacity to grow. ARCG designs and deploys automated workflow systems that route work, capture status, trigger follow-up, and escalate issues — without requiring a human to manage the flow.",
    },
    problem: {
      headline: "Manual Workflow Is a Growth Ceiling",
      body: "When workflows depend on people to manually hand off tasks, check on status, and remember to follow up, the system's capacity is limited to what those people can handle in a day. As volume grows, errors multiply, things fall through, and your team spends an increasing share of their time on coordination rather than execution. The ceiling isn't your team's capability — it's the absence of a system.",
      points: [
        "Tasks stall between team members because there's no automatic handoff",
        "Status tracking requires asking people directly rather than checking a system",
        "Follow-up depends on memory or manual calendar reminders",
        "Errors and missed steps are discovered late — after they've created downstream problems",
        "Reporting requires pulling data from multiple sources manually each time",
      ],
    },
    system: {
      headline: "Trigger-Based Automation That Runs the Coordination",
      body: "ARCG builds workflow automation systems using trigger-based logic: when X happens, Y is automatically initiated. No manual handoff required. The system routes work, captures data, sends notifications, and escalates overdue items without waiting for someone to remember to do it.",
      items: [
        { title: "Trigger-Based Routing", description: "Tasks and requests automatically routed to the right person, queue, or system based on type, priority, or source — no manual assignment." },
        { title: "Status Capture", description: "Each workflow stage captures completion data automatically, creating a real-time view of where every item stands without manual status updates." },
        { title: "Escalation Logic", description: "Overdue items, missed deadlines, and unacknowledged requests automatically escalate according to defined rules — no monitoring required." },
        { title: "Integration Layer", description: "Workflows connect across your existing tools — CRM, email, scheduling, billing — so data flows automatically rather than being re-entered." },
      ],
    },
    outcome: {
      headline: "The Operational Difference",
      metrics: [
        { value: "Zero", label: "Manual Handoffs", description: "Every task transition is automated — the system moves work without waiting for a person to pass it along." },
        { value: "Real-Time", label: "Status Visibility", description: "Any authorized team member can see exactly where every item stands without asking." },
        { value: "Scalable", label: "Capacity", description: "The system handles more volume without proportional increases in coordination overhead." },
      ],
    },
    implementation: {
      headline: "The Build Process",
      steps: [
        { step: "01", title: "Map Current Flow", description: "Document how work actually moves through your operation today — identifying every manual handoff, status check, and coordination point." },
        { step: "02", title: "Design Automation Layer", description: "Redesign the workflow with trigger-based logic, defining what happens automatically at each stage and what requires human judgment." },
        { step: "03", title: "Build & Integrate", description: "Configure the automation system, connect your existing tools, and test every trigger, routing rule, and escalation path." },
        { step: "04", title: "Go Live & Monitor", description: "Deploy with monitoring in place to catch any edge cases. Refine rules based on real-world data in the first 30 days." },
      ],
    },
    cta: {
      headline: "Map Your Highest-Cost Manual Workflow",
      body: "Complete the intake form and we'll identify which manual workflows are costing you the most and build a prioritized automation plan specific to your operation.",
    },
    relatedLinks: [
      { label: "AI automation consulting", href: "/ai-automation" },
      { label: "vendor dispatch automation", href: "/vendor-dispatch-workflow-automation" },
    ],
  },

  "operational-audit": {
    slug: "operational-audit",
    seo: {
      title: "Create My Operational Plan | ARCG Systems",
      description: "Find out exactly where your business is losing time and revenue. ARCG's AI-powered intake process diagnoses your system failures and delivers a custom intelligence report in under 60 seconds.",
    },
    hero: {
      eyebrow: "Operational Planning",
      h1: "Create Your Operational Plan — Find Exactly Where Your System Is Breaking",
      intro: "Most businesses know something is inefficient — they just can't identify exactly what it is or where to start fixing it. ARCG's intake process is a structured diagnostic that analyzes your operation and delivers a custom AI-generated intelligence report: diagnosis, quick wins, 30-day system plan, and specific recommendations built for your business.",
    },
    problem: {
      headline: "The Problem With Not Knowing Where to Start",
      body: "When inefficiency is scattered across a business, the instinct is to fix everything at once — or nothing at all. Generic productivity advice doesn't account for how your business actually operates. Without a structured diagnostic, improvements are guesses. ARCG's intake process replaces guesswork with a systematic analysis of where time and revenue are actually being lost.",
      points: [
        "Efficiency problems feel scattered — hard to prioritize or explain to stakeholders",
        "Consultants offer generic advice that doesn't account for your specific context",
        "You know something needs to change, but unsure whether it's people, process, or technology",
        "Previous improvement attempts addressed symptoms without fixing root causes",
        "No structured baseline to measure improvement against",
      ],
    },
    system: {
      headline: "A Structured Diagnostic — Not a Generic Checklist",
      body: "ARCG's intake process is a 13-question form that captures your business profile, lead flow, operational structure, and goals. Our AI engine analyzes your responses against operational failure patterns and generates a custom Operational Intelligence Report — specific to your business, your industry, and your situation.",
      items: [
        { title: "Business Profile Analysis", description: "Industry context, volume, response patterns, and tool stack analyzed to identify where your specific category of operation typically breaks down." },
        { title: "Root Cause Diagnosis", description: "The report identifies the structural failure driving your operational problem — not the symptom, but the underlying system gap." },
        { title: "Quick Win Identification", description: "Three specific, achievable improvements that can be implemented within 30 days with immediate impact on your operation." },
        { title: "90-Day Roadmap", description: "A phased build plan showing exactly what to automate, in what order, and why — so improvements compound rather than conflict." },
      ],
    },
    outcome: {
      headline: "What You Receive",
      metrics: [
        { value: "Custom", label: "Intelligence Report", description: "A full Operational Intelligence Report specific to your business — not a template, not generic advice." },
        { value: "90-Day", label: "Roadmap", description: "A phased implementation plan with prioritized recommendations and ROI rationale." },
        { value: "Free", label: "No Commitment", description: "The audit and report are provided at no cost. No sales call required to access the report." },
      ],
    },
    implementation: {
      headline: "How It Works",
      steps: [
        { step: "01", title: "Complete the Intake Form", description: "13 questions covering your business profile, lead volume, operational structure, tools, and goals. Takes under 2 minutes." },
        { step: "02", title: "AI Analysis", description: "Our AI engine analyzes your responses against operational failure patterns and builds your custom report — typically in under 60 seconds." },
        { step: "03", title: "Receive Your Report", description: "Your Operational Intelligence Report is delivered immediately: diagnosis, quick wins, 30-day system plan, tech stack, and pricing scenarios." },
        { step: "04", title: "Optional: Schedule a Review", description: "If the report identifies opportunities worth exploring, schedule a 20-minute scope confirmation call to validate the build plan." },
      ],
    },
    cta: {
      headline: "Create Your Operational Plan",
      body: "Complete the 2-minute intake form and receive a custom AI-generated Operational Intelligence Report — diagnosis, quick wins, and a 30-day system plan built for your specific business.",
    },
    relatedLinks: [
      { label: "AI automation consulting", href: "/ai-automation" },
      { label: "workflow automation", href: "/operational-workflow-automation" },
      { label: "compliance reporting", href: "/government-contractor-compliance-reporting" },
    ],
  },

  "vendor-dispatch-workflow-automation": {
    slug: "vendor-dispatch-workflow-automation",
    seo: {
      title: "Vendor Dispatch Workflow Automation | ARCG Systems",
      description: "Automate vendor dispatch, scheduling, and follow-up for facilities and service operations. ARCG builds dispatch automation systems that eliminate manual coordination and create documented accountability.",
    },
    hero: {
      eyebrow: "Dispatch & Vendor Automation",
      h1: "Vendor Dispatch Workflow Automation for Facilities and Service Operations",
      intro: "Managing vendor dispatch manually — through calls, texts, and email chains — creates accountability gaps, scheduling conflicts, and no audit trail. ARCG builds automated dispatch workflows that route service requests, confirm vendor assignments, capture completion data, and generate accountability documentation without manual coordination at every step.",
    },
    problem: {
      headline: "Manual Dispatch Creates Gaps That Compound Over Time",
      body: "Facilities and service operations that dispatch vendors manually typically face the same failure chain: a request comes in, someone calls a vendor, confirmation is assumed rather than documented, completion is reported verbally, and there's no clean record of what happened, when, or by whom. When something goes wrong, the audit trail is incomplete. When volume grows, the coordination load overwhelms the team.",
      points: [
        "Service requests tracked in texts, emails, and memory instead of a system",
        "Vendor confirmation depends on someone following up — not on an automated trigger",
        "Completion status requires calling the vendor rather than checking a system",
        "No automated documentation for compliance or client billing",
        "Scheduling conflicts discovered after the fact, not prevented by a system",
      ],
    },
    system: {
      headline: "Automated Dispatch That Creates Its Own Audit Trail",
      body: "ARCG builds vendor dispatch automation systems that handle the full lifecycle: intake to assignment to confirmation to completion to documentation. Each step is triggered automatically, captured in the system, and documented without requiring manual action from your team.",
      items: [
        { title: "Automated Request Intake", description: "Service requests enter the system through structured intake — form, email parser, or integration — and are automatically categorized and priority-assigned." },
        { title: "Vendor Routing & Assignment", description: "Requests automatically routed to the appropriate vendor based on service type, geography, availability, and priority." },
        { title: "Confirmation Workflows", description: "Vendors receive structured assignment notifications with confirmation required. Unacknowledged assignments escalate automatically." },
        { title: "Completion Documentation", description: "Completion data, timestamps, and notes captured in the system — creating an automatic audit trail for every dispatch event." },
      ],
    },
    outcome: {
      headline: "What the System Delivers",
      metrics: [
        { value: "Documented", label: "Every Dispatch", description: "Every service request, assignment, confirmation, and completion captured in the system automatically." },
        { value: "Zero", label: "Manual Follow-Up", description: "Confirmations and status updates happen automatically — your team monitors exceptions, not routine dispatch." },
        { value: "Audit-Ready", label: "Records", description: "Complete dispatch history available for compliance review, client reporting, or contract documentation." },
      ],
    },
    implementation: {
      headline: "Building Your Dispatch System",
      steps: [
        { step: "01", title: "Document Current Dispatch Flow", description: "Map how service requests currently enter, get assigned, get confirmed, and get closed — including every manual step and coordination point." },
        { step: "02", title: "Design Automated Flow", description: "Redesign each step with automation: intake rules, routing logic, confirmation triggers, escalation paths, and completion capture." },
        { step: "03", title: "Build & Configure", description: "Implement the system with vendor onboarding, notification templates, routing rules, and integration with existing scheduling or billing tools." },
        { step: "04", title: "Go Live With Monitoring", description: "Deploy with exception monitoring in place. Review the first 30 days of dispatch data to refine routing rules and confirm performance." },
      ],
    },
    cta: {
      headline: "Identify Your Dispatch Bottleneck",
      body: "Complete the intake form and we'll map your current dispatch workflow, identifying exactly where manual coordination is creating accountability gaps, delays, and errors.",
    },
    relatedLinks: [
      { label: "workflow automation", href: "/operational-workflow-automation" },
      { label: "facilities support", href: "/solutions/facilities-support" },
    ],
  },

  "government-contractor-compliance-reporting": {
    slug: "government-contractor-compliance-reporting",
    seo: {
      title: "Government Contractor Compliance Reporting | ARCG Systems",
      description: "Automated compliance reporting for government contractors. ARCG builds systems that capture operational data and generate audit-ready reports for federal, state, and contract mandate requirements.",
    },
    hero: {
      eyebrow: "GovCon · Compliance Reporting",
      h1: "Automated Compliance Reporting for Government Contractors",
      intro: "Government contractors operating under federal and state contracts face a compliance documentation burden that consumes significant administrative resources. ARCG builds automated compliance reporting systems that capture operational data in the field, format it for regulatory requirements, and generate audit-ready documentation — reducing the manual burden without reducing the rigor.",
    },
    problem: {
      headline: "Manual Compliance Reporting Creates Risk and Administrative Overhead",
      body: "Government contractors who compile compliance reports manually face two compounding problems: the time cost of manually aggregating data from field operations, and the risk that incomplete or inconsistent documentation creates during contract audits. As contract volume grows, the manual compliance burden grows proportionally — consuming staff time that should be spent on contract performance.",
      points: [
        "Field data captured informally and aggregated manually into reports",
        "Compliance documentation inconsistent across sites, crews, or contract periods",
        "Audit preparation requires days of manual data compilation and verification",
        "Missing certifications or expiring credentials discovered reactively, not proactively",
        "No real-time visibility into compliance status across active contracts",
      ],
    },
    system: {
      headline: "Automated Data Capture — Structured for Regulatory Requirements",
      body: "ARCG builds compliance automation systems that capture data at the source — field teams, dispatch logs, vendor records — and automatically format it for the specific regulatory and contractual requirements your contracts mandate. Reports are generated automatically, archiving is built in, and alerts prevent gaps before they become audit findings.",
      items: [
        { title: "Field Data Capture", description: "Structured intake for field operations — replacing informal notes and verbal reporting with documented, timestamped data entry." },
        { title: "Regulatory Format Automation", description: "Captured data automatically formatted for OSHA, EPA, contract-specific, and agency reporting requirements without manual reformatting." },
        { title: "Audit Trail & Archiving", description: "All compliance data automatically archived with version history, creating a defensible audit trail that doesn't require reconstruction." },
        { title: "Proactive Certification Alerts", description: "Expiring certifications, missing documentation, and compliance gaps surfaced automatically before they create audit exposure." },
      ],
    },
    outcome: {
      headline: "What Contractors Report After Implementation",
      metrics: [
        { value: "Audit-Ready", label: "At All Times", description: "Compliance documentation current and organized — audit preparation time reduced from days to hours." },
        { value: "Real-Time", label: "Compliance Visibility", description: "Dashboard view of compliance status across all active contracts without manual data aggregation." },
        { value: "Reduced", label: "Admin Overhead", description: "Staff time previously spent on manual compliance compilation redirected to contract performance." },
      ],
    },
    implementation: {
      headline: "Building Your Compliance Reporting System",
      steps: [
        { step: "01", title: "Compliance Requirements Mapping", description: "Identify all reporting requirements across active contracts — regulatory standards, agency formats, and contract-specific documentation mandates." },
        { step: "02", title: "Data Capture Design", description: "Design structured intake for all compliance data points, replacing informal field reporting with consistent, documented capture." },
        { step: "03", title: "Automation & Integration", description: "Build the automation layer: data aggregation, report generation, archiving, and alert rules for compliance gaps and expiring credentials." },
        { step: "04", title: "Validation & Handoff", description: "Validate report outputs against actual regulatory requirements before go-live. Full documentation and staff training included." },
      ],
    },
    cta: {
      headline: "Reduce Your Compliance Documentation Burden",
      body: "Complete the intake form and select Government Contracting as your industry to receive a compliance-specific diagnostic and recommended system design.",
    },
    relatedLinks: [
      { label: "compliance reporting", href: "/solutions/federal-access" },
      { label: "GovCon operations consulting", href: "/govcon-operations-consulting" },
      ],
  },

  "govcon-operations-consulting": {
    slug: "govcon-operations-consulting",
    seo: {
      title: "GovCon Operations Consulting | ARCG Systems",
      description: "Operational consulting for government contractors. ARCG helps GovCon firms build the systems, documentation, and operational infrastructure required to compete for and perform government contracts.",
    },
    hero: {
      eyebrow: "GovCon · Operations",
      h1: "GovCon Operations Consulting — Build the Systems That Win and Perform",
      intro: "Winning a government contract requires positioning, documentation, and systems that demonstrate competence before the contract is awarded. Performing on a government contract requires operational infrastructure that maintains compliance, delivers consistently, and generates the documentation that protects your firm. ARCG provides operational consulting that builds both — the bid-side infrastructure and the performance-side systems.",
    },
    problem: {
      headline: "Most GovCon Operational Failures Are Structural, Not Capability-Based",
      body: "Government contractors who lose bids or struggle with contract performance typically have capable teams. The failure is usually structural: inadequate documentation of past performance, compliance systems that don't scale, coordination processes that work at small volume but break under contract pressure, and bid packages that don't communicate capability the way evaluators score it. These are system problems — and they require system solutions.",
      points: [
        "Proposal packages inconsistent in structure and unable to score well against evaluation criteria",
        "Past performance documentation inadequate or difficult to compile quickly",
        "Compliance systems built for small volume that break under active contract requirements",
        "Subcontractor and teaming coordination handled manually rather than through documented processes",
        "No operational baseline to reference during audits, contract modifications, or disputes",
      ],
    },
    system: {
      headline: "Operational Infrastructure Built for Government Requirements",
      body: "ARCG's GovCon operations consulting builds the structural infrastructure that allows your firm to compete effectively and perform consistently. This covers both the bid-side systems — capability documentation, past performance records, proposal structure — and the performance-side systems — compliance, dispatch, reporting, and coordination workflows.",
      items: [
        { title: "Capability & Documentation Build", description: "Capability statements, past performance records, and technical writeups developed from your actual operational data — formatted for federal and state evaluators." },
        { title: "Compliance System Design", description: "Compliance infrastructure built for the specific regulatory requirements your contracts mandate — capturing data automatically and generating audit-ready documentation." },
        { title: "Operational Workflow Automation", description: "Core workflows — dispatch, vendor coordination, reporting — automated to handle contract volume without proportional increases in administrative overhead." },
        { title: "Subcontract & Teaming Structure", description: "Documented teaming agreements, subcontractor management workflows, and certified participation documentation that supports both bid packages and contract performance." },
      ],
    },
    outcome: {
      headline: "The Operational Difference",
      metrics: [
        { value: "Stronger", label: "Bid Packages", description: "Proposals and capability materials built to score well against evaluation criteria, not just describe services." },
        { value: "Scalable", label: "Contract Performance", description: "Operational systems that maintain compliance and delivery quality under contract volume without breaking down." },
        { value: "Defensible", label: "Documentation", description: "Audit trails, compliance records, and operational documentation that protects your firm during oversight and modification events." },
      ],
    },
    implementation: {
      headline: "How GovCon Operations Consulting Works",
      steps: [
        { step: "01", title: "GovCon Discovery", description: "Complete the intake form — select Government Contracting to receive a GovCon-specific diagnostic covering your bid infrastructure and performance systems." },
        { step: "02", title: "Gap Analysis & Prioritization", description: "ARCG identifies the highest-risk operational gaps and sequences the build plan to address bid-side needs first, then performance-side infrastructure." },
        { step: "03", title: "System Build", description: "Build the documentation, automation, and compliance systems identified in the gap analysis — with your team reviewing each component." },
        { step: "04", title: "Ongoing Support", description: "Optional monthly retainer covering system maintenance, compliance monitoring, and support during active bidding periods or contract audits." },
      ],
    },
    cta: {
      headline: "Start With a GovCon Plan",
      body: "Select Government Contracting as your industry on the intake form to receive a GovCon-specific diagnostic covering your bid infrastructure, compliance systems, and operational readiness.",
    },
    relatedLinks: [
      { label: "compliance reporting", href: "/government-contractor-compliance-reporting" },
      { label: "Federal Access & Compliance", href: "/solutions/federal-access" },
      ],
  },

};
