import tomb from '../../assets/img/TOMB.svg';
import twitter from '../../assets/img/twitter.svg';
import github from '../../assets/img/github.svg';
import discord from '../../assets/img/discord.svg';

function Footer() {
  return (
    <div className="hidden sm:flex mx-auto text-center items-center mt-20">
      <span className="font-Amarante text-xl mr-8 mb-1">Tomb Finance</span>
      <img src={tomb} width={20} height={20} />
      <span className="text-xs tracking-tight mx-1 text-gray-100">Copyright © Tomb Finance 2021</span>
      <img src={tomb} width={20} height={20} />
      <div className="flex items-center gap-x-3 ml-8">
        <a href="https://twitter.com/tombfinance" target="_blank" rel="noreferrer noopener">
          <img src={twitter} width={20} height={20} />
        </a>
        <a href="https://github.com/tombfinance/tombfinance-frontend" target="_blank" rel="noreferrer noopener">
          <img src={github} width={20} height={20} />
        </a>
        <a className="mt-1" href="discord.gg/vANnESmVdz" target="_blank" rel="noreferrer noopener">
          <img src={discord} width={19} height={19} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
