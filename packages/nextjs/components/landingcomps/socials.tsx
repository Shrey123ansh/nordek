import React from "react";

const Socials: React.FC = () => {
   
  return (
    <div className="w-full ">
  <div className="flex flex-row justify-between">
    {['/assets/discord.svg', '/assets/twitter.svg', '/assets/telegram.svg', '/assets/medium.svg', '/assets/reddit.svg'].map((iconSrc, index) => (
      <img key={index} src={iconSrc} alt={`Icon ${index + 1}`} className=" w-[15%]" />
    ))}
  </div>
</div>

  );
};

export default Socials;
