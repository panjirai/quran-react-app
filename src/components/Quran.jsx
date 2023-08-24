import { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Layout from '../layouts/layout';
// import Footer from './Footer';
import '../css/Quran.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from './Loading';

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchSurahs = () => {
    fetch(`https://api.npoint.io/99c279bb173a6e28359c/data`)
      .then((response) => response.json())
      .then((data) => {
        setSurahs(data);
        console.log(data)
        setIsLoading(false);
      })
      .catch((error) => console.error('Error fetching surahs:', error));
  };

  useEffect(() => {
    fetchSurahs();
  }, []);

 

  const filteredSurahs = surahs.filter((surah) =>
    surah.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );
  document.addEventListener('play', function(e) {
    var audios = document.getElementsByTagName('audio');

    for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] != e.target) {
            audios[i].pause();
        }
    }
}, true);
  return (
    <>
      <Layout />
      <ReactBootstrap.Container>
        
        {/* Search Form */}
        <div className="mb-3 mt-3">
          <ReactBootstrap.FormControl
            type="text"
            placeholder="Search by Surah name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ReactBootstrap.Row className='g-3'>
          {isLoading && <Loading cards={15}/>}
          
          {filteredSurahs.map((surah, index) => (
            <ReactBootstrap.Col key={index}>
              <ReactBootstrap.Card className='card-quran' style={{ boxShadow: 100 }}>
                <ReactBootstrap.Card.Body>
                <ReactBootstrap.Accordion>
                  <ReactBootstrap.Accordion.Item eventKey="1">
                  <ReactBootstrap.Accordion.Header>{surah.nomor}. {surah.nama} &nbsp; {surah.asma} 
              
                  </ReactBootstrap.Accordion.Header>
                  <ReactBootstrap.Accordion.Body>
                  <div dangerouslySetInnerHTML={{__html: surah.keterangan}} />
                  </ReactBootstrap.Accordion.Body>
                </ReactBootstrap.Accordion.Item>
                </ReactBootstrap.Accordion>
                
                  <ReactBootstrap.ListGroup.Item className='text-center mt-3'>  <audio controls width="100%" >
                    <source src={surah.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio></ReactBootstrap.ListGroup.Item>
                
                
                  
                </ReactBootstrap.Card.Body>
              </ReactBootstrap.Card>
            </ReactBootstrap.Col>
          ))}
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
      <br />
    </>
  );
}
