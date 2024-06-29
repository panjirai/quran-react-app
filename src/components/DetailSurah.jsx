import { useState, useEffect, useRef } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const DetailSurah = ({ nomor, onClose }) => {
  const [surahs, setSurah] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const audioRefs = useRef([]);

  const fetchSurah = () => {
    fetch(`https://quran-api-id.vercel.app/surahs/${nomor}`)
      .then((response) => response.json())
      .then((data) => {
        setSurah(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching surah:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchSurah();
  }, [nomor]); // Include nomor as a dependency to refetch when nomor changes

  const playAllAyahs = () => {
    if (audioRefs.current.length > 0) {
      let currentIndex = 0;

      const playNext = () => {
        if (currentIndex < audioRefs.current.length) {
          const currentAudio = audioRefs.current[currentIndex];
          currentAudio.play();
          currentAudio.onended = () => {
            currentIndex += 1;
            playNext();
          };
        }
      };

      playNext();
    }
  };

  return (
    <ReactBootstrap.Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={onClose}
    >
      <ReactBootstrap.Modal.Body>
        {isLoading ? (
          <ReactBootstrap.Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </ReactBootstrap.Spinner>
        ) : (
          <>
            <ReactBootstrap.Modal.Title>
              {surahs.number}. {surahs.name}
            </ReactBootstrap.Modal.Title>
            <ReactBootstrap.Card.Subtitle className="mb-2 text-muted">
              {surahs.translation}
            </ReactBootstrap.Card.Subtitle>
          </>
        )}
        {isLoading ? (
          <ReactBootstrap.Container className="text-center">
            <ReactBootstrap.Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </ReactBootstrap.Spinner>
          </ReactBootstrap.Container>
        ) : (
          <>
            <br />
            <ReactBootstrap.Accordion>
              <ReactBootstrap.Accordion.Item eventKey="1">
                <ReactBootstrap.Accordion.Header>
                  {surahs.numberOfAyahs} Ayat
                </ReactBootstrap.Accordion.Header>
                <ReactBootstrap.Accordion.Body>
                  {surahs.ayahs.map((ayah, index) => (
                    <ReactBootstrap.ListGroup.Item key={index}>
                      <p>{ayah.arab}</p>
                      <p>{ayah.translation}</p>
                      <p>
                        <audio
                          ref={(el) => (audioRefs.current[index] = el)}
                          controls
                          width="100%"
                          style={{ maxWidth: '350px' }}
                        >
                          <source src={ayah.audio.ahmedajamy} type="audio/ogg" />
                          <source src={ayah.audio.ahmedajamy} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </p>
                    </ReactBootstrap.ListGroup.Item>
                  ))}
                </ReactBootstrap.Accordion.Body>
              </ReactBootstrap.Accordion.Item>
            </ReactBootstrap.Accordion>
            <br />
            <ReactBootstrap.Container className="text-center">
              <ReactBootstrap.Button variant="primary" onClick={playAllAyahs}>
                Play All Ayahs
              </ReactBootstrap.Button>
            </ReactBootstrap.Container>
          </>
        )}
      </ReactBootstrap.Modal.Body>
      <ReactBootstrap.Modal.Footer>
        <ReactBootstrap.Button variant="secondary" onClick={onClose}>
          Close
        </ReactBootstrap.Button>
      </ReactBootstrap.Modal.Footer>
    </ReactBootstrap.Modal>
  );
};

export default DetailSurah;
