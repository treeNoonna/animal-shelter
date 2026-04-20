import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <SiteHeader active="about" />
      <main className="simple-page-shell">
        <section className="about-hero" style={{ display: "flex", alignItems: "flex-end", gap: "32px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            <p className="eyebrow">About</p>
            <h1 className="simple-page-title">민간 보호소를 도와주세요</h1>
            <p className="about-lead">
              이 홈페이지는 민간 동물 보호소의 정보를 한 곳에 모아놓기 위해 만들어졌어요.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cat2.png" alt="" aria-hidden="true" style={{ width: 160, flexShrink: 0 }} />
        </section>

        <section className="about-grid">
          <div className="about-col">
            <h2 className="about-section-title">왜 만들었나요?</h2>
            <p className="section-copy">
              민간 보호소 특성상 제대로 된 주소가 없는 곳이 많아서, SNS 계정 하나만 보고는 그 보호소가 어디에 있는지, 어떤 곳인지 알기가 어려워요.
              인스타 계정 하나 발견하면 계좌번호가 없고, 계좌번호를 찾으면 이번엔 어디에 있는
              곳인지 알 수가 없고. 공공 보호소는 유기동물 공고 사이트에 전부 올라오는데,
              실제로 훨씬 더 열악한 환경에서 운영되는 민간 보호소 정보는 정리된 곳이 없어요.
            </p>
            <p className="section-copy">
              사단 법인이 아닌, 개인이 혼자 운영하는 곳은 제대로 된 지원을 받기 어려워요.
              법적으로 불안정하다 보니 정부 지원도 제대로 못 받고, 홍보도 개인 SNS에 의지할
              수밖에 없고요. 공공 보호소가 닿지 못하는 구조 현장을 채우고 있으면서도
              제일 안 보이는 곳에 있어요.
            </p>
            <p className="section-copy">
              이 사이트는 그 정보들을 한 군데 모아두는 곳이에요. SNS 링크, 후원 계좌,
              필요한 물품, 어느 지역에 있는지. 거창한 건 아니고, 관심 있는 사람이 조금 더
              빠르게 닿을 수 있으면 충분해요.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cat3.png" alt="" aria-hidden="true" style={{ width: 200, display: "block", marginTop: "16px" }} />
          </div>

          <div className="about-col">
            <h2 className="about-section-title">지금 상황</h2>
            <p className="section-copy">
              2023년 농식품부 실태조사에서 전국 민간동물보호시설 102곳 중 약 80곳이 입지·건축물
              관련 불법 이슈를 안고 있는 것으로 파악됐어요. 개발제한구역이나 농업진흥구역에
              위치하거나, 허가 없이 지어진 가설건축물에서 운영되는 경우가 대부분이에요.
              격리실이나 사료보관실 같은 기본 시설도 없는 곳이 많고요.
            </p>
            <p className="section-copy">
              같은 해 동물보호법 개정으로 민간동물보호시설 신고제가 도입됐는데, 신고가 잘 안 되고
              있어요. 2025년 9월 기준으로 102곳 중 17곳만 신고를 마쳤고, 그중 6곳 이상은
              보호소로 둔갑한 동물 판매업소, 이른바 신종펫숍이라는 얘기도 나와요.
            </p>
            <p className="section-copy">
              아이러니한 건, 농지에서 개를 번식해 파는 동물생산업은 허용되는데 개를 보호하는
              민간동물보호시설은 농지법 위반이 된다는 거예요. 불법인 게 아니라 제도가 현실을
              못 따라가고 있는 상황이에요.
            </p>
            <p className="section-copy">
              소규모 보호소(100마리 이하)는 신고 기한이 2029년까지로 유예될 예정이지만,
              101마리~400마리 규모의 중·대형 보호소들은 유예 대상에서 빠졌어요. 기한을 못 맞추면
              그대로 동물보호법 위반 시설이 되는 거고요. 수의사회 봉사단이 찾아가고, 국회의원이나
              연예인도 다녀간 꽤 알려진 보호소들도 이 문제에서 자유롭지 않다고 해요.
            </p>
            <p className="section-copy">
              열악한 환경에서도 학대받은 동물들을 받아온 곳들이 동물보호법을 위반하는 처지가 되는 건
              좀 이상한 일이에요. 이 사이트가 그 보호소들을 알리는 데 조금이라도 도움이 됐으면 해요.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
