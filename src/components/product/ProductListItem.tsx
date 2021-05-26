import React from 'react';
import { Block, Flex, Link, Text, useTheme } from 'vcc-ui';
import { ProductInterface } from '../../models/product';

const ProductListItem = React.forwardRef(
  (
    { product, extend = {} }: { product: ProductInterface; extend?: object },
    ref
  ) => {
    const theme = useTheme();

    const links = [
      { href: `/${product.id}/learn/`, label: 'Learn' },
      { href: `/${product.id}/shop/`, label: 'Shop' },
    ];

    return (
      <Flex extend={extend} ref={ref}>
        <Text
          extend={{
            color: theme.color.primitive.grey200,
            textTransform: 'uppercase',
          }}
        >
          {product.bodyType}
        </Text>
        <Flex
          extend={{
            '@media (min-width: 768px)': {
              flexDirection: 'row',
            },
          }}
        >
          <Text
            subStyle="emphasis"
            extend={{
              color: theme.color.primitive.grey900,
            }}
          >
            {product.modelName}
          </Text>
          <Text
            extend={{
              color: theme.color.primitive.grey200,
              '@media (min-width: 768px)': {
                paddingLeft: '.25rem',
              },
            }}
          >
            {product.modelType}
          </Text>
        </Flex>

        <img src={product.imageUrl} alt={product.modelName} />
        <Flex extend={{ flexDirection: 'row', justifyContent: 'center' }}>
          {links.map((link) => (
            <Block extend={{ padding: '0 .75rem' }} key={link.href}>
              <Link href={link.href} arrow="right">
                {link.label}
              </Link>
            </Block>
          ))}
        </Flex>
      </Flex>
    );
  }
);

export default ProductListItem;
