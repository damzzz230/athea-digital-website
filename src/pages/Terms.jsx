import { Link } from 'react-router-dom'
import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

export default function Terms() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Website Terms & Conditions"
      lastUpdated="20 July 2026"
      intro={<>These Terms &amp; Conditions ("Terms") govern your use of the website athea.digital (the "Site"), operated by Athea Digital ("Athea", "we", "us", "our"). By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site. These Terms are intended to comply with the Electronic Communications and Transactions Act 25 of 2002 ("ECTA").</>}
    >
      <LegalSection title="Who We Are">
        <LegalList items={[
          'Name: Athea Digital',
          'Nature: Boutique web design studio',
          'Location: Johannesburg, Gauteng, South Africa',
          'Contact: info@atheadigital.co.za',
        ]} />
      </LegalSection>

      <LegalSection title="Use of the Site">
        <p>You may use the Site for lawful purposes only: to learn about our services, view our work, and contact us. You may not:</p>
        <LegalList items={[
          'Use the Site in any way that breaches any law or regulation.',
          'Attempt to gain unauthorised access to the Site or its servers.',
          'Introduce malicious code, or interfere with the Site’s operation.',
          'Copy, reproduce, or republish Site content without our permission (see below).',
        ]} />
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content on the Site — including text, design, code, graphics, logos, animations, and the "Athea Digital"
          name and brand — is owned by or licensed to Athea and is protected by intellectual property law. You may not
          copy, reproduce, distribute, or create derivative works from any Site content without our prior written
          consent. Portfolio items shown on the Site may include client work displayed with permission and remain the
          property of the respective owners.
        </p>
      </LegalSection>

      <LegalSection title="Quotes and Enquiries">
        <p>
          Information on the Site, including pricing, is provided for general information and does not constitute a
          binding offer. Any project is subject to a separate Service Agreement. Prices shown may change without
          notice. The price applicable to your project is the one confirmed in writing for that project.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          The Site may contain links to third-party websites (e.g. social media, client sites). We are not responsible
          for the content, policies, or practices of those sites.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          The Site is provided "as is" and "as available". We do not warrant that it will be uninterrupted, error-free,
          or free of harmful components. While we take care to keep information accurate and current, we make no
          warranty as to its completeness or accuracy and may change Site content at any time.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Athea is not liable for any loss or damage arising from your use of,
          or inability to use, the Site, including any indirect or consequential loss. Nothing in these Terms excludes
          liability that cannot lawfully be excluded.
        </p>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          Your use of the Site is also governed by our{' '}
          <Link to="/privacy" style={{ color: '#8B5CF6', textDecoration: 'underline' }}>Privacy Policy</Link>,
          which explains how we handle personal information in line with POPIA.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The current version, with its "last updated" date, will always
          be available on the Site. Continued use of the Site means you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the Republic of South Africa, and you submit to the jurisdiction of
          the South African courts.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>info@atheadigital.co.za — Athea Digital, Johannesburg, South Africa.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
