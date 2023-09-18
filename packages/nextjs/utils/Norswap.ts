export const calculateRewards = ({
  amount,
  startTime,
  apy,
  frequency,
}: {
  amount: number;
  startTime: number;
  frequency: number;
  apy: { value: number; changeTime: number }[];
}) => {
  let index = 0;
  let rewards = 0;
  const currentTimeMillis = new Date().getTime();
  const blockTime = Math.floor(currentTimeMillis / 1000);

  const length = apy.length;

  if (length > 1) {
    for (let i = 0; i < length; i++) {
      if (startTime <= apy[i].changeTime) {
        index = i;
        break;
      }
    }

    if (index === 0) {
      return (amount * apy[length - 1].value * (blockTime - startTime)) / (10000 * frequency);
    } else {
      for (let i = index; i < length; i++) {
        let _value = (amount * apy[i - 1].value * (apy[i].changeTime - startTime)) / (10000 * frequency);
        // rewards.add(_value);
        rewards += _value;
        startTime = apy[i].changeTime;
      }
      rewards += (amount * apy[length - 1].value * (blockTime - startTime)) / (10000 * frequency);

      return rewards;
    }
  } else {
    return (amount * apy[0].value * (blockTime - startTime)) / (10000 * frequency);
  }
};
