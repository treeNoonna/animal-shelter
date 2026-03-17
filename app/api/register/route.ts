import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type RegisterPayload = {
  shelterName: string;
  region: string;
  address: string;
  hours: string;
  description: string;
  sns: string;
  donation: string;
  items: string;
  contactName: string;
  contactEmail: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as RegisterPayload;

  const requiredFields = [
    "shelterName",
    "region",
    "address",
    "hours",
    "description",
    "sns",
    "donation",
    "contactName",
    "contactEmail",
  ] as const;

  const missing = requiredFields.find((field) => !payload[field]?.trim());
  if (missing) {
    return NextResponse.json({ message: "필수 항목이 비어 있습니다." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.REGISTER_FORM_TO_EMAIL ?? "wndnjs6304@gmail.com";

  if (!host || !user || !pass) {
    return NextResponse.json(
      { message: "이메일 전송 설정이 아직 완료되지 않았습니다. SMTP 정보를 먼저 설정해 주세요." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Pet Shelter Archive" <${user}>`,
    to,
    replyTo: payload.contactEmail,
    subject: `[보호소 등록 요청] ${payload.shelterName}`,
    text: `
보호소 이름: ${payload.shelterName}
지역: ${payload.region}
주소: ${payload.address}
운영 시간: ${payload.hours}

보호소 소개:
${payload.description}

SNS 링크:
${payload.sns}

후원 정보:
${payload.donation}

필요 물품:
${payload.items || "-"}

담당자 이름: ${payload.contactName}
담당자 이메일: ${payload.contactEmail}
    `.trim(),
  });

  return NextResponse.json({ message: "등록 요청이 이메일로 전송되었습니다." });
}
