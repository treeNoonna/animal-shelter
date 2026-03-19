"use client";

import { FormEvent, useState } from "react";

const initialState = {
  shelterName: "",
  region: "",
  address: "",
  hours: "",
  description: "",
  sns: "",
  donation: "",
  items: "",
  contactName: "",
  contactEmail: "",
};

export function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "제출 중 오류가 발생했습니다.");
      return;
    }

    setStatus("success");
    setMessage(data.message ?? "등록 요청이 전송되었습니다.");
    setForm(initialState);
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>보호소 이름</span>
          <input
            required
            value={form.shelterName}
            onChange={(event) => setForm((current) => ({ ...current, shelterName: event.target.value }))}
          />
        </label>

        <label className="form-field">
          <span>지역</span>
          <input
            required
            placeholder="예: 서울, 경기"
            value={form.region}
            onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))}
          />
        </label>

        <label className="form-field">
          <span>주소</span>
          <input
            required
            value={form.address}
            onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
          />
        </label>

        <label className="form-field">
          <span>운영 시간</span>
          <input
            required
            placeholder="예: 화-일 11:00 - 18:00"
            value={form.hours}
            onChange={(event) => setForm((current) => ({ ...current, hours: event.target.value }))}
          />
        </label>

        <label className="form-field form-field-wide">
          <span>보호소 소개</span>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          />
        </label>

        <label className="form-field form-field-wide">
          <span>SNS 링크</span>
          <textarea
            required
            rows={3}
            placeholder="인스타그램, 블로그, 유튜브 링크를 줄바꿈으로 입력"
            value={form.sns}
            onChange={(event) => setForm((current) => ({ ...current, sns: event.target.value }))}
          />
        </label>

        <label className="form-field form-field-wide">
          <span>후원 정보</span>
          <textarea
            rows={3}
            placeholder="계좌번호 또는 후원 링크"
            value={form.donation}
            onChange={(event) => setForm((current) => ({ ...current, donation: event.target.value }))}
          />
        </label>

        <label className="form-field form-field-wide">
          <span>필요 물품</span>
          <textarea
            rows={3}
            placeholder="예: 사료, 패드, 고양이 모래"
            value={form.items}
            onChange={(event) => setForm((current) => ({ ...current, items: event.target.value }))}
          />
        </label>

        <label className="form-field">
          <span>담당자 이름</span>
          <input
            value={form.contactName}
            onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
          />
        </label>

        <label className="form-field">
          <span>담당자 이메일</span>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="detail-link detail-solid" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "보내는 중..." : "등록 요청 보내기"}
        </button>
        {message ? <p className={`form-message ${status}`}>{message}</p> : null}
      </div>
    </form>
  );
}
