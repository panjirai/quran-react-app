/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as ReactBootstrap from 'react-bootstrap';
import { useState, useEffect } from 'react';
const Loading = ({ cards }) => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        // Retrieve theme preference from local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          document.documentElement.setAttribute('data-bs-theme', savedTheme);
          setDarkMode(savedTheme === 'dark');
        }
      }, []);
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <ReactBootstrap.Col key={i}>
            <ReactBootstrap.Card className='card-quran' style={{ boxShadow: 100 }}>
              <ReactBootstrap.Card.Body className='text-center'>
              {darkMode ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton width={300} height={20} count={4} />
                </SkeletonTheme>
                ) : (
                <SkeletonTheme baseColor="#808080" highlightColor="#c0c0c0">
                    <Skeleton width={300} height={20} count={4} />
                </SkeletonTheme>
                )}

              </ReactBootstrap.Card.Body>
            </ReactBootstrap.Card>
          </ReactBootstrap.Col>
        ))}
    </>
  );
}

export default  Loading;
