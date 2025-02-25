import Card from './Card';

export default function CemeteryCard({ title, descriptionTitle, description, buttonText, onClick, icon1, icon2 }) {
  return (
    <Card innerClass="pt-12 pb-6 px-10 sm:px-2" className="relative text-center w-72 md:w-96 text-3xl mt-4 ">
      <div className="flex justify-center absolute w-full left-0 -top-8">
        <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient -mr-1">
          <img src={icon1} width={30} height={30} />
        </div>
        <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient">
          <img src={icon2} width={30} height={30} />
        </div>
      </div>
      <div className="font-Amarante mb-2 mt-2">{title}</div>
      <div className="font-semibold font-Poppins text-xs text-tomb-purple">
        {descriptionTitle}
        <br />
        {description}
      </div>
      <button onClick={() => onClick && onClick()} className="btn mb-2 mt-8 px-10">
        {buttonText}
      </button>
    </Card>
  );
}
