import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

function useScrollableList(
  listRef: MutableRefObject<HTMLElement | undefined>,
  listItemRefs: RefObject<HTMLElement | undefined>[]
) {
  const [scrollElementIndex, setScrollElementIndex] = useState(0);

  const scrollHandler = useCallback(
    (e: Event) => {
      const elementWidth =
        listItemRefs?.[0]?.current?.getBoundingClientRect()?.width ?? 0;

      if (!elementWidth) {
        return;
      }
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        clientWidth = 0,
      } = listRef?.current ?? {};

      const availableScroll = scrollWidth - clientWidth;
      const scrollableElements = Math.floor(availableScroll / elementWidth);
      const numberOfItems = Object.keys(listItemRefs).length;
      const elementScrollBreakpoint =
        (scrollableElements / numberOfItems) * elementWidth;

      const scrolledElements = Math.floor(scrollLeft / elementScrollBreakpoint);
      setScrollElementIndex(
        scrolledElements >= numberOfItems ? numberOfItems - 1 : scrolledElements
      );
    },
    [listItemRefs, listRef]
  );
  useEffect(() => {
    listRef?.current?.addEventListener('scroll', scrollHandler);
    return () => {
      listRef?.current?.removeEventListener('sroll', scrollHandler);
    };
  }, [listRef, scrollHandler]);

  return {
    scrollElementIndex,
  };
}

export default useScrollableList;
