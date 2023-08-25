import { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Layout from '../layouts/layout';
// import Footer from './Footer';
import '../css/Quran.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from './Loading';
import DetailSurah from './DetailSurah';

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const fetchSurahs = () => {
    fetch(`https://quran-api-id.vercel.app/surahs`)
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

 

 
  document.addEventListener('play', function(e) {
    var audios = document.getElementsByTagName('audio');

    for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] != e.target) {
            audios[i].pause();
        }
    }
}, true);
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = surahs.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(surahs)
  }
}
const detailSurah = (surah) => {
  setSelectedSurah(surah);
  setShowModal(true);
};
  return (
    <>
      <Layout />
      <ReactBootstrap.Container>
        
        {/* Search Form */}
        <ReactBootstrap.InputGroup className="mb-3 mt-4">
        <ReactBootstrap.Form.Control
          placeholder="Search by name..."
          aria-label="Search by name..."
          aria-describedby="basic-addon2"
          id="seacrhId"
          name="search"
          onChange={(e) => searchItems(e.target.value)}
        />
      </ReactBootstrap.InputGroup>
        
        <ReactBootstrap.Row className='g-4'>
          {isLoading && <Loading cards={15}/>}
          {searchInput.length > 1 ? (
                    filteredResults.map((surah,index) => {
                        return (
                          <ReactBootstrap.Col key={index} md={4} >
                          <ReactBootstrap.Card className='card-quran' style={{ boxShadow: 100 }}>
                            <ReactBootstrap.Card.Body>
                            <ReactBootstrap.Card.Title >{surah.number}. {surah.name}  </ReactBootstrap.Card.Title>
                            <ReactBootstrap.Card.Subtitle className="mb-2 text-muted">{surah.translation}</ReactBootstrap.Card.Subtitle>
                 
                            <ReactBootstrap.Accordion>
                              <ReactBootstrap.Accordion.Item eventKey="1">
                              <ReactBootstrap.Accordion.Header>Deskripsi
                              </ReactBootstrap.Accordion.Header>
                              <ReactBootstrap.Accordion.Body>
                              <div dangerouslySetInnerHTML={{__html: surah.description}} />
                              </ReactBootstrap.Accordion.Body>
                            </ReactBootstrap.Accordion.Item>
                            </ReactBootstrap.Accordion>
                            <br />
                              <ReactBootstrap.Card.Link href="#" onClick={() => detailSurah(surah.number)}>Detail</ReactBootstrap.Card.Link>
                            </ReactBootstrap.Card.Body>
                          </ReactBootstrap.Card>
                        </ReactBootstrap.Col>
                        )
                    })
                ) : (
                    surahs.map((surah,index) => {
                        return (
                          <ReactBootstrap.Col key={index} md={4} >
                          <ReactBootstrap.Card className='card-quran' style={{ boxShadow: 100 }}>
                            <ReactBootstrap.Card.Body>
                            <ReactBootstrap.Card.Title >{surah.number}. {surah.name}  </ReactBootstrap.Card.Title>
                            <ReactBootstrap.Card.Subtitle className="mb-2 text-muted">{surah.translation}</ReactBootstrap.Card.Subtitle>
                 
                            <ReactBootstrap.Accordion>
                              <ReactBootstrap.Accordion.Item eventKey="1">
                              <ReactBootstrap.Accordion.Header>Deskripsi
                              </ReactBootstrap.Accordion.Header>
                              <ReactBootstrap.Accordion.Body>
                              <div dangerouslySetInnerHTML={{__html: surah.description}} />
                              </ReactBootstrap.Accordion.Body>
                            </ReactBootstrap.Accordion.Item>
                            </ReactBootstrap.Accordion>
                            <br />
                              <ReactBootstrap.Card.Link href="#" onClick={() => detailSurah(surah.number)}>Detail</ReactBootstrap.Card.Link>
                            </ReactBootstrap.Card.Body>
                          </ReactBootstrap.Card>
                        </ReactBootstrap.Col>
                        )
                    })
                )}
         
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
      <br />

      {showModal && selectedSurah && (
        <DetailSurah nomor={selectedSurah} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
