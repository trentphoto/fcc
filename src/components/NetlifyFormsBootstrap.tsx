export default function NetlifyFormsBootstrap() {
  return (
    <div aria-hidden="true" className="hidden">
      <form name="prayer-request" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="request" />
        <input name="bot-field" />
      </form>
      <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message" />
        <input name="bot-field" />
      </form>
    </div>
  );
}
