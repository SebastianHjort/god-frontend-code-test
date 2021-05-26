import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Block, Flex, useTheme, View } from 'vcc-ui';
import { ProductInterface } from '../../models/product';
import { ChevronButton } from '../generic/buttons';
import { useScrollableList } from '../generic/hooks';
import { BulletIndicator } from '../generic/indicators';
import { ProductListItem } from './';

function ProductList({ products }: { products: ProductInterface[] }) {
  const theme = useTheme();
  const listRef = useRef<HTMLElement>();
  const listItemRefs: RefObject<HTMLElement>[] = products.map(() =>
    React.createRef()
  );
  const { scrollElementIndex: indicatorIndex } = useScrollableList(
    listRef,
    listItemRefs
  );
  const [itemIndex, setItemIndex] = useState(0);

  useEffect(() => {
    const elementWidth =
      listItemRefs?.[0]?.current?.getBoundingClientRect()?.width ?? 0;
    listItemRefs.map((value: RefObject<HTMLElement>, index: number) => {
      const item = listItemRefs[index].current as HTMLElement;
      if (item) {
        item.style.transform = `translateX(-${itemIndex * elementWidth}px)`;
      }
      return item;
    });
  }, [itemIndex, listItemRefs]);

  return (
    <View
      extend={{
        margin: '0 1rem',

        marginTop: '2rem',
      }}
    >
      <Flex
        ref={listRef}
        extend={{
          flexDirection: 'row',
          overflow: 'auto',

          [theme.breakpoints.fromL]: {
            overflow: 'hidden',
          },
        }}
      >
        {products.map((product, index) => (
          <ProductListItem
            ref={listItemRefs[index]}
            product={product}
            key={product.id}
            extend={{
              paddingRight: '1rem',
              width: '75%',
              transition: '.5s transform ease-in-out',
              [theme.breakpoints.fromM]: {
                width: '50%',
              },
              '@media (min-width: 768px)': {
                width: '33%',
              },
              [theme.breakpoints.fromL]: {
                width: '25%',
              },
            }}
          />
        ))}
      </Flex>

      {/* Small screens indicator */}
      <BulletIndicator
        extend={{
          margin: '0 auto',
          [theme.breakpoints.fromL]: {
            display: 'none',
          },
        }}
        amount={products.length}
        activeIndex={indicatorIndex}
      />

      {/* Desktop navigation */}
      {products.length > 4 && (
        <Block
          extend={{
            marginRight: '1rem',
            marginLeft: 'auto',
            display: 'none',
            [theme.breakpoints.fromL]: {
              display: 'block',
            },
          }}
        >
          <ChevronButton
            direction="left"
            disabled={itemIndex === 0}
            onClick={() => setItemIndex(itemIndex - 1)}
          />{' '}
          <ChevronButton
            direction="right"
            disabled={itemIndex >= products.length - 4}
            onClick={() => setItemIndex(itemIndex + 1)}
          />
        </Block>
      )}
    </View>
  );
}

export default ProductList;
