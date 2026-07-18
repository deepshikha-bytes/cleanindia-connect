function cleanText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanDescription(value) {
  return value
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

export function generateComplaintText(complaintData) {
  const citizenName = cleanText(complaintData.citizenName || "");
  const location = cleanText(complaintData.location);
  const issueType = cleanText(complaintData.issueType);
  const urgency = cleanText(complaintData.urgency);
  const description = cleanDescription(complaintData.description);

  return `To,
The Concerned Municipal Authority

Subject: Complaint regarding ${issueType} at ${location}

Respected Sir/Madam,

I would like to bring to your attention a cleanliness-related issue in my area.

Location:
${location}

Issue Type:
${issueType}

Urgency Level:
${urgency}

Problem Description:
${description}

This issue is affecting the cleanliness, hygiene, and overall environment of the area. It may also create health risks for nearby residents and people passing through the location.

I kindly request the concerned authority to inspect the location and take the necessary action as soon as possible.

Thank you.

Yours sincerely,
${citizenName || "Concerned Citizen"}`;
}