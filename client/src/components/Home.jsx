export default function Home({ chooseWord }) {
  return (
    <p className="site-desc">
      &apos;Science is...&apos; gives users a place to discover more about what
      makes things tick. The latest science news, quotes from famous scientists,
      fascinating insights into mind-bending concepts, discussion with like
      minded people... Perhaps give us a try and find out for yourself why
      science is... <span className="site-desc-word">{chooseWord()}</span>
    </p>
  );
}
