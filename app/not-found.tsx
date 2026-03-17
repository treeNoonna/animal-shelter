import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="clay-card empty-state standalone-state">
        <h1>보호소를 찾지 못했어요</h1>
        <p>목록으로 돌아가서 다른 보호소를 선택해보세요.</p>
        <Link className="ghost-button" href="/">
          홈으로 이동
        </Link>
      </section>
    </main>
  );
}
