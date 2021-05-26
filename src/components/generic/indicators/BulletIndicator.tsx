import React, { useEffect, useState } from 'react';
import { Block, Flex } from 'vcc-ui';

function BulletIndicator({
  amount,
  activeIndex,
  extend = {},
}: {
  amount: number;
  activeIndex: number;
  extend?: object;
}) {
  const [bullets, setBullets] = useState<Number[]>([]);

  useEffect(() => {
    const elements = [];
    for (let i = 0; i < amount; i++) {
      elements.push(i);
    }
    setBullets(elements);
  }, [amount]);

  return (
    <Flex
      extend={{
        flexDirection: 'row',
        ...extend,
      }}
    >
      {bullets.map((item, index) => (
        <Block
          key={item}
          extend={{
            background: '#000',
            height: '.5rem',
            width: '.5rem',
            borderRadius: '.5rem',
            margin: '0 0.25rem',
            transition: 'opacity .25s ease-in-out',
            opacity: index === activeIndex ? 1 : 0.1,
          }}
        />
      ))}
    </Flex>
  );
}

export default BulletIndicator;
