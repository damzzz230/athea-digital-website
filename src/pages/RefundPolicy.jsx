import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Refund Policy"
      lastUpdated="20 July 2026"
      intro="We design your site first, at no cost. You only commit once you've seen and approved the concept — so you never pay for something you haven't seen. A 50% deposit starts the build; the balance is due once the finished site is approved. This policy explains how refunds work at each stage."
    >
      <LegalSection title="The Design Stage — No Cost, No Risk">
        <LegalList items={[
          'The concept design (mockup) we present is provided at no charge and with no obligation.',
          'If you decide not to proceed after seeing the concept, you pay nothing — there is nothing to refund, because nothing was paid. You walk away with no obligation.',
          'In this situation, Athea retains all rights in the concept. It is not handed over, deployed, or licensed to you.',
        ]} />
      </LegalSection>

      <LegalSection title="The Deposit (Build Phase)">
        <p>Once you approve the concept, a 50% deposit is payable to begin the build. This deposit is payment for the build phase.</p>
        <LegalList items={[
          'If Athea fails to deliver the agreed build — we are unable to deliver it, we abandon the project, or we materially breach our agreement — the deposit is refunded to you in full.',
          'If you cancel after the build has commenced, fundamentally change direction, or do not proceed for reasons not attributable to Athea, the deposit is non-refundable. It covers build work already committed and performed, and you had already inspected and approved the concept before paying.',
        ]} />
        <div style={{
          background: 'rgba(139,92,246,0.06)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: '10px',
          padding: '14px 18px',
          margin: '14px 0',
        }}>
          <strong style={{ color: '#F0EDE8' }}>Why this is fair:</strong> the deposit reflects real work — the build —
          that begins the moment it is paid. We only keep it where you choose not to proceed after we've started; if
          the failure is on our side, you get every cent back.
        </div>
        <p>
          <strong style={{ color: '#F0EDE8' }}>Consumer law note.</strong> Under South African law, the cooling-off
          rights that apply to certain electronic and direct-marketing transactions (under the Electronic
          Communications and Transactions Act 25 of 2002 and the Consumer Protection Act 68 of 2008) generally do not
          apply to goods or services made to a consumer's own specifications. A custom website built for your business
          falls into this category. This does not remove any right you have under the law that cannot be contracted
          out of.
        </p>
      </LegalSection>

      <LegalSection title="The Balance — Completed Build">
        <p>
          The remaining 50% balance is due on your approval of the completed build, before deployment to your live
          domain. Because the site is custom-built to the concept you approved, and is delivered to you upon full
          payment, build fees are non-refundable once paid and the site has been handed over. This reflects that you
          inspected and approved both the concept and the completed build before paying the balance; the work is
          bespoke and made to your specifications; and once handed over, you own and can use the site.
        </p>
      </LegalSection>

      <LegalSection title="Errors and Defects (Our Mistakes)">
        <p>
          If, after handover, you find that the site does not function as agreed at the time of delivery (a genuine
          defect, not a change of mind or a new request), tell us within 7 days of handover and we will fix it at no
          charge. This does not cover:
        </p>
        <LegalList items={[
          'Changes you want that were not part of the original brief or approved concept.',
          'Issues caused by changes you or a third party made after handover.',
          'Problems with third-party services, browsers, or devices outside our control.',
          'Dissatisfaction with results such as traffic, rankings, or leads (which we do not guarantee).',
        ]} />
        <p>
          This 7-day fix is in addition to, and does not limit, any rights you have under the Consumer Protection Act
          that cannot be contracted out of.
        </p>
      </LegalSection>

      <LegalSection title="Maintenance Retainer">
        <LegalList items={[
          'The Maintenance Retainer is billed monthly in advance.',
          'You may cancel at any time with 1 month\'s written notice (email or WhatsApp). There is no lock-in.',
          'The current month\'s retainer fee, once paid, is non-refundable, as the service is made available for that month. Cancellation simply stops future billing.',
          'Full retainer terms are set out in your Maintenance Retainer Agreement.',
        ]} />
      </LegalSection>

      <LegalSection title="Exceptional Circumstances">
        <p>
          We're a two-person studio and we'd rather keep clients happy than win an argument. If something genuinely
          went wrong on our side, talk to us. We'll consider reasonable resolutions — a fix, a partial credit, or
          another fair outcome — on a case-by-case basis, at our discretion. This is goodwill, not an entitlement, and
          is separate from your statutory rights.
        </p>
      </LegalSection>

      <LegalSection title="How to Raise a Refund or Defect Query">
        <p>
          Contact us on WhatsApp or at info@atheadigital.co.za with your business name, the project, and a clear
          description of the issue. We aim to respond within 2 working days.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
