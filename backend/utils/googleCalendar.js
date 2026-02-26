const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n');
const DEFAULT_TIMEZONE = process.env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata';

function getJwtClient(subjectEmail) {
  if (!SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error('Google service account environment variables are not configured');
  }

  return new google.auth.JWT(
    SERVICE_ACCOUNT_EMAIL,
    null,
    SERVICE_ACCOUNT_PRIVATE_KEY,
    SCOPES,
    subjectEmail || undefined
  );
}

function buildDateTimes(classDate, classTime, durationMinutes = 60) {
  const [hh, mm] = (classTime || '00:00').split(':').map(Number);
  const start = new Date(classDate);
  start.setHours(hh || 0, mm || 0, 0, 0);

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

async function createGoogleMeetForClass({ title, classDate, classTime, teacherEmail, studentEmails = [] }) {
  if (!classDate || !classTime || !teacherEmail) {
    throw new Error('classDate, classTime, and teacherEmail are required to create a Google Meet');
  }

  const auth = getJwtClient(teacherEmail);
  const calendar = google.calendar({ version: 'v3', auth });

  const { startISO, endISO } = buildDateTimes(classDate, classTime);

  const requestId = `class-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const event = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: title,
      start: {
        dateTime: startISO,
        timeZone: DEFAULT_TIMEZONE,
      },
      end: {
        dateTime: endISO,
        timeZone: DEFAULT_TIMEZONE,
      },
      attendees: studentEmails.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  });

  const data = event.data || {};

  const meetLink =
    data.hangoutLink ||
    (data.conferenceData &&
      Array.isArray(data.conferenceData.entryPoints) &&
      data.conferenceData.entryPoints.find((e) => e.entryPointType === 'video')?.uri) ||
    null;

  return {
    meetLink,
    eventId: data.id,
    htmlLink: data.htmlLink,
  };
}

module.exports = {
  createGoogleMeetForClass,
};

