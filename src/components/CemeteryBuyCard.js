import Card from './Card';

export default function CemeteryBuyCard({
  coinValue,
  dollarValue,
  tokenName,
  buttonText,
  disabled,
  onClick,
  icon1,
  icon2,
}) {
  return (
    <Card innerClass="pt-12 pb-6 px-10 sm:px-2" className="relative text-center w-full text-3xl mt-4">
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
      <div className="font-Amarante mb-1 mt-1">{coinValue}</div>
      <div className="font-semibold font-Amarante text-base text-tomb-purple">
        USD <span className="text-white">{dollarValue}</span>
      </div>
      <button onClick={() => onClick} className={`btn mb-2 mt-6 px-10 ${disabled && 'btn-disabled'}`}>
        {buttonText}
      </button>
    </Card>
  );
}
