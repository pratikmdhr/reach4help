import React from "react"
import { useTranslation } from "react-i18next"
import { Wrapper, ContentWrapper, LogosWrapper } from "./style"
import Logos from "./assets"

function Partners() {
  const { t } = useTranslation()
  return (
    <Wrapper id="partners">
      <ContentWrapper>
        <h2>{t("ImpactPage.PartnersSection.heading")}</h2>
        <h3>{t("ImpactPage.PartnersSection.subheading")}</h3>
      </ContentWrapper>
      <LogosWrapper>
        {Logos.map(logo => (
          <a
            title={logo.name}
            href={logo.link}
            key={logo.name}
            target="__blank"
            rel="noopener noreferrer"
          >
            <img src={logo.logo} alt={`${logo.name} Logo`} />
          </a>
        ))}
      </LogosWrapper>
    </Wrapper>
  )
}

export default Partners
