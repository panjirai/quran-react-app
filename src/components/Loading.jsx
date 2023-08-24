/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as ReactBootstrap from 'react-bootstrap';

const Loading = ({ cards }) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <ReactBootstrap.Col key={i}>
            <ReactBootstrap.Card className='card-quran' style={{ boxShadow: 100 }}>
              <ReactBootstrap.Card.Body className='text-center'>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton width={300} height={20} count={4} />
                </SkeletonTheme>
              </ReactBootstrap.Card.Body>
            </ReactBootstrap.Card>
          </ReactBootstrap.Col>
        ))}
    </>
  );
}

export default  Loading;
