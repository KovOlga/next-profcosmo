import { FC, useEffect, useState } from "react";
import style from "./style.module.scss";
import leftArrow from "../../assets/icon_pagination_left.svg";
import rightArrow from "../../assets/icon_pagination_right.svg";
import Image from "next/image";

export type TPagintaion = {
  pages: number;
};

interface IVisiblePages {
  leftPointer: number;
  visibleArr: number[];
  current: number;
}

const Pagination: FC<TPagintaion> = ({ pages }) => {
  const [originArr, setOriginArr] = useState<number[]>([1]);
  const [visiblePages, setVisiblePages] = useState<IVisiblePages>({
    leftPointer: 0,
    visibleArr: [],
    current: 0,
  });

  useEffect(() => {
    const temp = Array.from({ length: pages }, (_, i) => i + 1);
    setOriginArr(temp);
    setVisiblePages((prevState) => {
      return { ...prevState, visibleArr: temp.slice(0, 6) };
    });
  }, [pages]);

  const decreaseCurrent = () => {
    setVisiblePages((prevState) => {
      const newCurrent = prevState.current - 1;
      return {
        ...prevState,
        current: newCurrent,
      };
    });
  };

  const moveLeft = () => {
    if (originArr.length <= 6 && visiblePages.current > 0) {
      decreaseCurrent();
    } else if (visiblePages.leftPointer > 0) {
      if (visiblePages.current > 2) {
        decreaseCurrent();
      } else if (visiblePages.leftPointer > 0) {
        setVisiblePages((prevState) => {
          const leftPointerNew = prevState.leftPointer - 1;
          const temp = originArr.slice(leftPointerNew, leftPointerNew + 6);
          return {
            ...prevState,
            leftPointer: leftPointerNew,
            visibleArr: temp,
          };
        });
      }
    } else if (
      originArr.length > 6 &&
      visiblePages.leftPointer === 0 &&
      visiblePages.current > 0
    ) {
      decreaseCurrent();
    }
  };

  const increaseCurrent = () => {
    setVisiblePages((prevState) => {
      const newCurrent = prevState.current + 1;
      return {
        ...prevState,
        current: newCurrent,
      };
    });
  };

  const moveRight = () => {
    if (originArr.length <= 6 && visiblePages.current <= originArr.length - 2) {
      increaseCurrent();
    } else if (visiblePages.leftPointer + 6 < originArr.length) {
      if (visiblePages.current < 2) {
        increaseCurrent();
      } else if (visiblePages.leftPointer + 6 < originArr.length) {
        setVisiblePages((prevState) => {
          const leftPointerNew = prevState.leftPointer + 1;
          const temp = originArr.slice(leftPointerNew, leftPointerNew + 6);
          return {
            ...prevState,
            leftPointer: leftPointerNew,
            visibleArr: temp,
          };
        });
      }
    } else if (originArr.length > 6 && visiblePages.current < 5) {
      increaseCurrent();
    }
  };

  const changePage = (index: number) => {
    setVisiblePages((prevState) => {
      return {
        ...prevState,
        current: index,
      };
    });
  };

  return (
    <div className={style.container}>
      <button
        disabled={
          visiblePages.visibleArr[0] === originArr[0] &&
          visiblePages.current === 0
        }
        onClick={moveLeft}
        className={style.button}
      >
        <Image className={style.pagination} src={leftArrow} alt="leftArrow" />
      </button>
      <ul className={style.list}>
        {visiblePages.visibleArr.map((item, index) => {
          return (
            <li
              key={index}
              className={`${style.list__item} ${
                index === visiblePages.current ? style.list__item_active : null
              }`}
            >
              <a
                className={`${style.link} ${
                  index === visiblePages.current ? style.link_active : null
                }`}
                onClick={() => changePage(index)}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
      <button
        disabled={originArr[visiblePages.current] === originArr[-1]}
        onClick={moveRight}
        className={style.button}
      >
        <Image className={style.pagination} src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  );
};

export default Pagination;
