function Footer() {
  return (
    <div className="hidden sm:flex mx-auto text-center items-center">
      <span className="font-Amarante text-xl mr-8 mb-1">Tomb Finance</span>
      <img src={`/TOMB.svg`} width={20} height={20} />
      <span className="text-xs tracking-tight text-gray-100">Copyright © Tomb Finance 2021</span>
      <img src={`/TOMB.svg`} width={20} height={20} />
      <div className="flex gap-x-3 ml-8">
        <img src={`/twitter.svg`} width={20} height={20} />
        <img src={`/github.svg`} width={20} height={20} />
        <img src={`/discord.svg`} width={20} height={20} />
      </div>
    </div>
  );
}

export default Footer;
