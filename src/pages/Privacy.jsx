import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

export default function Privacy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="20 July 2026"
      intro="Athea Digital (&quot;Athea&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit athea.digital or engage with us. We process personal information in accordance with the Protection of Personal Information Act 4 of 2013 (&quot;POPIA&quot;)."
    >
      <LegalSection title="Who We Are">
        <p>Athea Digital is the "responsible party" for the personal information we process.</p>
        <LegalList items={[
          'Information Officer: Damian de Boer',
          'Contact: info@atheadigital.co.za',
          'Location: Johannesburg, Gauteng, South Africa',
        ]} />
      </LegalSection>

      <LegalSection title="What Information We Collect">
        <p>We collect only what we need:</p>
        <LegalList items={[
          'Information you give us directly — when you fill in a contact form, message us on WhatsApp, or email us: name, business name, email address, phone / WhatsApp number, and any details you include in your message.',
          'Information collected automatically — when you visit our website: IP address and approximate location, browser and device type, pages visited and time spent, referring website.',
          'Client project information — if you become a client, we collect the business information, content, and assets you provide for your build.',
        ]} />
      </LegalSection>

      <LegalSection title="Why We Collect It (Purpose)">
        <p>
          We use your information to respond to your enquiry and provide quotes; build, deliver, and support your website;
          communicate with you about your project; manage payments and invoicing; improve our website and services; and
          send you relevant updates, only where you have agreed to receive them. We will not use your information for any
          purpose incompatible with the above without your consent.
        </p>
      </LegalSection>

      <LegalSection title="Lawful Basis">
        <p>
          We process your information on the basis of: your consent; the performance of a contract with you (your project);
          our legitimate business interests (such as responding to enquiries and improving our services); and compliance
          with the law.
        </p>
      </LegalSection>

      <LegalSection title="Who We Share It With">
        <p>We do not sell your personal information. We share it only with:</p>
        <LegalList items={[
          'Service providers that help us operate, such as Netlify (hosting and deployment), Google (analytics and maps), Zoho (email), and our payment / invoicing tools.',
          'Professional advisors (e.g. accountant) where necessary.',
          'Authorities, where required by law.',
        ]} />
        <p style={{ marginTop: '10px' }}>
          Where these providers are located outside South Africa, we take reasonable steps to ensure your information is
          afforded an adequate level of protection, as required by POPIA.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Analytics">
        <p>
          Our website may use cookies and similar technologies to function correctly and to understand how visitors use
          the site (e.g. via Google Analytics). You can disable cookies in your browser settings, though some features
          may not work as intended. Where we use non-essential cookies (such as analytics), we seek your consent via the
          cookie notice on the site.
        </p>
      </LegalSection>

      <LegalSection title="How Long We Keep It">
        <p>
          We keep personal information only as long as necessary for the purposes above, or as required by law
          (e.g. tax and accounting records). Enquiry data from people who do not become clients is deleted or
          anonymised once it is no longer needed.
        </p>
      </LegalSection>

      <LegalSection title="How We Protect It">
        <p>
          We apply reasonable technical and organisational measures to protect your information against loss,
          unauthorised access, and misuse. No system is perfectly secure, but we take this seriously.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights Under POPIA">
        <p>You have the right to:</p>
        <LegalList items={[
          'Ask what personal information we hold about you.',
          'Request correction or deletion of your information.',
          'Object to processing in certain circumstances.',
          'Withdraw consent (e.g. to marketing) at any time.',
          'Lodge a complaint with the Information Regulator.',
        ]} />
        <p style={{ marginTop: '10px' }}>
          To exercise any of these, contact our Information Officer at info@atheadigital.co.za.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong style={{ color: '#F0EDE8' }}>Information Regulator (South Africa):</strong>{' '}
          Website: inforegulator.org.za · Email: complaints.IR@justice.gov.za
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our services are aimed at businesses, not children. We do not knowingly collect personal information from
          anyone under 18.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Policy from time to time. The latest version will always be on our website, with the
          "last updated" date shown above.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this Policy or your personal information: info@atheadigital.co.za — Athea Digital,
          Johannesburg, South Africa.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
