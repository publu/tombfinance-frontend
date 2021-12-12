import tomb from '../../assets/img/TOMB.svg';
import twitter from '../../assets/img/twitter.svg';
import github from '../../assets/img/github.svg';
import discord from '../../assets/img/discord.svg';

function Footer() {
  return (
    <div className="hidden sm:flex mx-auto text-center items-center mt-20">
      <span className="font-Amarante text-xl mr-8 mb-1">Tomb Finance</span>
      <img src={tomb} width={20} height={20} />
      <span className="text-xs tracking-tight text-gray-100">Copyright © Tomb Finance 2021</span>
      <img src={tomb} width={20} height={20} />
      <div className="flex gap-x-3 ml-8">
        <img src={twitter} width={20} height={20} />
        <img src={github} width={20} height={20} />
        <img src={discord} width={20} height={20} />
      </div>
    </div>
  );
}

export default Footer;
