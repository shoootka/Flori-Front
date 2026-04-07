const ADDRESS = "str. Alexandri, 123, Chisinau, Moldova";
const PHONE = "+373 79 727272";
const EMAIL = "info@florive.md";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Адрес: {ADDRESS}</p>
        <p>Телефон: {PHONE}</p>
        <p>Email: {EMAIL}</p>
      </div>
      <p>© 2026 FLORIVÉ. Все права защищены.</p>
    </footer>
  );
}

export default Footer;