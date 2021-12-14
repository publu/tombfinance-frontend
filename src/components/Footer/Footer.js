import tomb from '../../assets/img/TOMB.svg';
import boo from '../../assets/img/boo-footer.svg';
import twitter from '../../assets/img/twitter.svg';
import github from '../../assets/img/github.svg';
import discord from '../../assets/img/discord.svg';
import telegram from '../../assets/img/telegram.svg';
import youtube from '../../assets/img/youtube.svg';

function Footer() {
  return (
    <div className="hidden sm:flex mx-auto text-center items-center mt-20">
      <span className="font-Amarante text-xl mr-8 mb-1">Tomb Finance</span>
      <span className="text-xs tracking-tight text-gray-100">Copyright © Tomb Finance 2021</span>
      <div className="flex items-center gap-x-3 ml-8">
        <a href="https://twitter.com/tombfinance" target="_blank" rel="noreferrer noopener">
          <img src={twitter} width={20} height={20} />
        </a>
        <a href="https://github.com/tombfinance/tombfinance-frontend" target="_blank" rel="noreferrer noopener">
          <img src={github} width={20} height={20} />
        </a>
        <a className="mt-1" href="https://discord.gg/vANnESmVdz" target="_blank" rel="noreferrer noopener">
          <img src={discord} width={19} height={19} />
        </a>
        {/* <a className="mt-1" href="https://discord.gg/vANnESmVdz" target="_blank" rel="noreferrer noopener">
          <img src={boo} width={19} height={19} />
        </a> */}
        <a className="mt-1" href="https://t.me/tombfinance" target="_blank" rel="noreferrer noopener">
          <img src={telegram} width={19} height={19} />
        </a>
        <a
          className="mt-1"
          href="https://www.youtube.com/channel/UCGf87DxPzLXwPrfYpXIkaLQ"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={youtube} width={19} height={19} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
