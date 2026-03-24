function Hero() {
  const scrollToCatalog = () => {
    document.querySelector(".grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <h2>Свежие цветы с доставкой</h2>
      <p>Оформите подписку и получайте цветы каждый месяц</p>
      <button onClick={scrollToCatalog}>Перейти к каталогу</button>
    </section>
  );
}

export default Hero;