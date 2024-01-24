import React from "react";

const Socials: React.FC = () => {
   
  return (
    <div className="w-full ">
  <div className="flex flex-row justify-between ">
  {
  ['/assets/discord.svg', '/assets/twitter.svg', '/assets/telegram.svg', '/assets/medium.svg', '/assets/reddit.svg'].map((iconSrc, index) => {
    const urls = ['https://discord.com/invite/HWgDCEvR2z', 'https://twitter.com/officialnordek', 'https://t.me/officialnordek', 'https://medium.com/@officialnordek', 'https://reddit.com'];
    return (
      <div key={index} onClick={() => window.open(urls[index], '_blank')} style={{cursor: 'pointer'}} className="w-[10%]">
        <img src={iconSrc} alt={`Icon ${index + 1}`} className=" w-[100%]" />
      </div>
    );
  })
}
  </div>
</div>

  );
};

export default Socials;
