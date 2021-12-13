import Card from './Card';
import zapImg from '../assets/img/zap.svg';
import { numberWithCommas } from '../utils/utils';

export default function CemeteryBuyCard({
  coinValue,
  dollarValue,
  tokenName,
  button1Text,
  button2Text,
  button3Text,
  disabled,
  onClick,
  onClick1,
  onClick2,
  onClick3,
  icon1,
  icon2,
}) {
  return (
    <Card innerClass="pt-12 pb-6 px-10 sm:px-2" className="relative text-center w-72 md:w-96 text-3xl mt-4">
      <div className="flex justify-center absolute w-full left-0 -top-8">
        <div className={`flex justify-center w-16 h-16 rounded-full bg-tombGradient ${icon2 && '-mr-1'}`}>
          <img src={icon1} width={30} height={30} />
        </div>
        {icon2 && (
          <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient">
            <img src={icon2} width={30} height={30} />
          </div>
        )}
      </div>
      <div className="font-semibold font-Poppins text-xs text-tomb-purple">{tokenName}</div>
      <div className="font-Amarante mb-1 mt-1">{numberWithCommas(coinValue)}</div>
      <div className="font-semibold font-Amarante text-base text-tomb-purple">
        USD <span className="text-white">{numberWithCommas(dollarValue)}</span>
      </div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => (onClick1 ? onClick1() : onClick())}
          className={`btn mb-2 mt-6 px-10 ${disabled && 'btn-disabled'} ${onClick1 && 'w-max px-5'}`}
        >
          {button1Text}
        </button>
        {onClick2 && (
          <button onClick={() => onClick2()} className={`btn mb-2 w-max mt-6 px-5 ${disabled && 'btn-disabled'}`}>
            {button2Text}
          </button>
        )}
        {onClick3 && (
          <button onClick={() => onClick3()} className={`btn mb-2 w-max mt-6 px-5 ${disabled && 'btn-disabled'}`}>
            {button3Text}
          </button>
        )}
      </div>
    </Card>
  );
}
