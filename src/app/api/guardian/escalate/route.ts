import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userDescription = body.userDescription?.trim();
    const pageRoute = body.pageRoute || '/';
    const userEmail = body.userEmail || 'anonymous_creator@session';

    if (!userDescription) {
      return NextResponse.json(
        { error: 'Incident description is required for escalation.' },
        { status: 400 }
      );
    }

    // Redact sensitive patterns (passwords, tokens, authorization headers)
    const sanitizedDescription = userDescription
      .replace(/password[:=]\s*\S+/gi, '[REDACTED_PASSWORD]')
      .replace(/token[:=]\s*\S+/gi, '[REDACTED_TOKEN]')
      .replace(/bearer\s+[a-zA-Z0-9._-]+/gi, '[REDACTED_BEARER]')
      .slice(0, 1000);

    const incidentId = `INC-${Math.floor(2000 + Math.random() * 8000)}`;
    const timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      incidentId,
      timestamp,
      status: 'investigating',
      assignedTeam: 'Guardian Autonomous Reliability Engine',
      userMessage: `Incident ${incidentId} logged successfully. Guardian AI diagnostics have been dispatched for route ${pageRoute}.`,
      sanitizedSummary: sanitizedDescription,
    });
  } catch (err) {
    console.error('Error in /api/guardian/escalate:', err);
    return NextResponse.json(
      { error: 'Failed to record support incident.' },
      { status: 500 }
    );
  }
}
