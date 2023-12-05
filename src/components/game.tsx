import { useEffect, useState } from 'react';
import './game.scss';

export const Game = () => {
  const [win, setWin] = useState(false);
  let winCount = 0;
  let addTop = true;
  let addLeft = true;
  let top = 0;
  let left = 0;

  const move = (child: HTMLDivElement) => {
    const parentWidth = child.parentElement?.offsetWidth ?? 0;
    const childWidth = child?.offsetWidth ?? 0;
    const parentHeight = child.parentElement?.offsetHeight ?? 0;
    const childHeight = child?.offsetHeight ?? 0;

    setWin(false);
    
    const addCountTop = Math.floor(Math.random() * 100) + 50;
    const addCountLeft = Math.floor(Math.random() * 100) + 50;

    let topCorner = false;
    let leftCorner = false;
    
    if (addTop) {      
      top += addCountTop;
      if (top >= parentHeight - childHeight - 10) {
        top = parentHeight - childHeight - 10;
        topCorner = true;
        addTop = false;
      }
    } else if (!addTop && !topCorner) {
      top -= addCountTop;
      if (top <= 0) {
        topCorner = true;
        top = 0;
        addTop = true;
      }
    }

    if (addLeft) {
      left += addCountLeft;
      if(left >= parentWidth - childWidth - 10) {
        leftCorner = true;
        left = parentWidth - childWidth - 10;
        addLeft = false;
      }
    } else if (!addLeft && !leftCorner) {
      left -= addCountLeft;
      if(left <= 0) {
        leftCorner = true;
        left = 0;
        addLeft = true;
      }
    }

    if (topCorner && leftCorner) {
      winCount += 1;
      console.log('hit the corner', winCount, winCount === 1 ? 'time' : 'times');
      setWin(true);
    }

    child.style.top = `${top}px`;
    child.style.left = `${left}px`;
  }

  useEffect(() => {
    const child = document.getElementsByClassName('child')[0];
    setInterval(() => move(child as HTMLDivElement), 1500);
  }, []);

  return (
    <div id='game' className='container'>
      <div className='child'>
        {
          win && (
            <>
              <div className='corner corner-tl' />
              <div className='corner corner-tr' />
              <div className='corner corner-br' />
              <div className='corner corner-bl' />
            </>
          )
        }
      </div>
    </div>
  );
}