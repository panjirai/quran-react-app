import { useState, useEffect, useRef } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const DetailSurah = ({ nomor, onClose }) => {
  const [surahs, setSurah] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRefs = useRef([]);
  const currentIndex = useRef(0);

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
      setIsPlaying(true);
      currentIndex.current = 0;
      playNext();
    }
  };

  const playNext = () => {
    if (currentIndex.current < audioRefs.current.length) {
      const currentAudio = audioRefs.current[currentIndex.current];
      currentAudio.volume = volume;
      currentAudio.play();
      currentAudio.onended = () => {
        currentIndex.current += 1;
        playNext();
      };
    } else {
      setIsPlaying(false);
    }
  };

  const stopAllAyahs = () => {
    setIsPlaying(false);
    if (currentIndex.current < audioRefs.current.length) {
      const currentAudio = audioRefs.current[currentIndex.current];
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRefs.current.forEach(audio => {
      if (audio) audio.volume = newVolume;
    });
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
              <ReactBootstrap.Button variant="primary" onClick={playAllAyahs} disabled={isPlaying}>
                Play All Ayahs
              </ReactBootstrap.Button>
              <ReactBootstrap.Button variant="danger" onClick={stopAllAyahs} disabled={!isPlaying}>
                Stop
              </ReactBootstrap.Button>
              <br /><br />
              <ReactBootstrap.Form.Label>Volume</ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Range value={volume} onChange={handleVolumeChange} min="0" max="1" step="0.01" />
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
