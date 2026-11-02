export default function FAQ({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div className="faq-item" key={i}>
          <details>
            <summary>{f.q}</summary>
            <div className="faq-a"><p>{f.a}</p></div>
          </details>
        </div>
      ))}
    </div>
  );
}
