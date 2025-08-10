import React, { useState, useEffect } from 'react';
import ThreeDotsIcon from '../assets/three-dots-vertical-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';


function Home() {                        
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [region, setRegion] = useState('');
  const [creator, setCreator] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username') || null);
  const [showMenu, setShowMenu] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate(); 



  //Filtri
  const [filterGame, setFilterGame] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterRank, setFilterRank] = useState('');

  //za edit
  const [editingAd, setEditingAd] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editGame, setEditGame] = useState('');
  const [editRank, setEditRank] = useState('');
  const [editRegion, setEditRegion] = useState('');

  //za opgg link
    const gameShortNames = {
    'League of Legends': 'lol',
    'Valorant': 'valorant',
    'Overwatch': 'overwatch',
  };

const openEditPopup = (ad) => {
  setEditingAd(ad);  // set the full ad object
  setEditTitle(ad.title);
  setEditDescription(ad.description);
  setEditGame(ad.game);
  setEditRank(ad.rank);
  setEditRegion(ad.region);
  setShowEditPopup(true); // Open the edit popup
};

  // Load ads on page load
useEffect(() => {
  const url = `${process.env.REACT_APP_API_URL}/oglasi`;
  console.log('Fetching ads from:', url);

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Fetched ads data:', data);
      const sortedAds = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAds(sortedAds);
    })
    .catch((err) => console.error('Error fetching ads:', err));
}, []);


  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/oglasi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, game, rank, region, creator: loggedInUser})
    })
      .then((res) => res.json())
      .then((newAd) => {
        console.log('New ad response from backend:', newAd);
        window.location.reload(); 
        setAds([...ads, { id: newAd.adId || Date.now(), title, description, game, rank, region, creator: loggedInUser,       createdAt: new Date().toISOString() // add this for sorting
      }]);
        setTitle('');
        setDescription('');
        setGame('');
        setRank('');
        setRegion('');
        setShowPopup(false);
      })
      .catch((err) => console.error('Error posting ad:', err));
  };
//hANDLE EDIT 
const handleEditSubmit = (e) => {
  e.preventDefault();
  console.log('Editing ad ID:', editingAd.id);
  console.log('PUT data:', { title: editTitle, description: editDescription, game: editGame, rank: editRank, region: editRegion });
  fetch(`${process.env.REACT_APP_API_URL}/oglasi/${editingAd.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: editTitle,
      description: editDescription,
      game: editGame,
      rank: editRank,
      region: editRegion,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Edit response:', data);
      setAds(
        ads.map((ad) =>
          ad.id === editingAd.id
            ? {
                ...ad,
                title: editTitle,
                description: editDescription,
                game: editGame,
                rank: editRank,
                region: editRegion,
              }
            : ad
        )
      );
      setEditingAd(null);
      setShowEditPopup(false);
    })
    .catch((err) => console.error('Error editing ad:', err));
};


  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/oglasi/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Delete response:', data);
        setAds(ads.filter((ad) => ad.id !== id));
      })
      .catch((err) => console.error('Error deleting ad:', err));
  };


  const gameOptions = ['Valorant', 'League of Legends', 'CS2', 'Overwatch'];

  const rankOptions = {
    'Valorant': [
      'Iron I', 'Iron II', 'Iron III', 'Bronze I', 'Bronze II', 'Bronze III',
      'Silver I', 'Silver II', 'Silver III', 'Gold I', 'Gold II', 'Gold III',
      'Platinum I', 'Platinum II', 'Platinum III', 'Diamond I', 'Diamond II', 'Diamond III',
      'Ascendant I', 'Ascendant II', 'Ascendant III', 'Immortal I', 'Immortal II', 'Immortal III', 'Radiant'
    ],
    'League of Legends': [
      'Iron I', 'Iron II', 'Iron III', 'Iron IV', 'Bronze I', 'Bronze II', 'Bronze III', 'Bronze IV',
      'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Gold I', 'Gold II', 'Gold III', 'Gold IV',
      'Platinum I', 'Platinum II', 'Platinum III', 'Platinum IV',
      'Emerald I', 'Emerald II', 'Emerald III', 'Emerald IV',
      'Diamond I', 'Diamond II', 'Diamond III', 'Diamond IV',
      'Master', 'Grand Master', 'Challenger'
    ],
    'CS2': [
      'Common (0-4999)', 'Uncommon (5000-9999)', 'Rare (10000-14999)',
      'Mythical (15000-19999)', 'Legendary (20000-24999)',
      'Ancient (25000-29999)', 'Unusual (30000+)'
    ],
    'Overwatch': [
      'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond',
      'Master', 'Grandmaster', 'Champion', 'Top 500'
    ]
  };

  const regionOptions = {
    'Valorant': ['NA', 'LATAM', 'BR', 'EU', 'KR', 'AP', 'JP', 'Middle East'],
    'League of Legends': ['NA', 'EUW', 'EUNE', 'KR', 'BR', 'LAN', 'LAS', 'RU', 'TR', 'OCE', 'JP', 'CN'],
    'Overwatch': ['Americas', 'EU', 'Asia', 'China'],
    'CS2': ['US East', 'US West', 'South America', 'Europe', 'Russia', 'Middle East', 'Africa', 'Asia']
  };

  return (
  <div style={{padding:'5rem'}}>
    <h1>Find the perfect duo!</h1>
    {/*FORM ZA USTVARIT OGLASE*/}
    <div className="ad-button-container">
      <p>Post your ad now and team up with the best players!</p>
      <button onClick={() => setShowPopup(true)} className="create-ad-button">
      Create Ad
      </button>
    </div>

  {/*POPUP*/}
    {showPopup && (
      <>
      {loggedInUser ? (
  <div className="popup-overlay" onClick={() => setShowPopup(false)}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <h2>Create New Ad</h2> 
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Game:</label>
          <select value={game} onChange={(e) => { setGame(e.target.value); setRank(''); setRegion(''); }} required>
            <option value="">-- Select Game --</option>
            {gameOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        {game && (
          <>
            <div>
              <label>Rank:</label>
              <select value={rank} onChange={(e) => setRank(e.target.value)} required>
                <option value="">-- Select Rank --</option>
                {rankOptions[game].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Region:</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} required>
                <option value="">-- Select Region --</option>
                {regionOptions[game].map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <button type="submit">Add Ad</button>
      </form>
    </div>
  </div>
      ) : (
        <p className="login-message" onClick={() => navigate('/login')}>Log in to create your ad! Click here to log in.</p>
    )}
  </>
)}

        {/* FILTER OGLASOV */}
      <div className="filter-bar">
        <div className="filter-group">
        <label>Game:</label>
        <select value={filterGame} onChange={(e) => setFilterGame(e.target.value)}>
          <option value="">All</option>
          <option value="Valorant">Valorant</option>
          <option value="League of Legends">League of Legends</option>
          <option value="CS2">CS2</option>
          <option value="Overwatch">Overwatch</option>
        </select>
        </div>
        <div className="filter-group">
        <label>Region:</label>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          disabled={!filterGame}
        >
          <option value="">All</option>
          {filterGame &&
            regionOptions[filterGame]?.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
        </select>
        </div>
        <div className="filter-group">
        <label>Rank:</label>
        <select
          value={filterRank}
          onChange={(e) => setFilterRank(e.target.value)}
          disabled={!filterGame}
        >
          <option value="">All</option>
          {filterGame &&
            rankOptions[filterGame]?.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
        </select>
      </div>
    </div>

<div className="ads-table">
      <div className="ad-header">
        <div>Title</div>
        <div>Game</div>
        <div>Rank</div>
        <div>Region</div>
        <div>Username</div>
        <div>Description</div>
        <div></div>
      </div>

      
{/* SEZNAM OGLASOV */}
<div className="ads-list">
  {ads
    .filter((ad) => {
      return (
        (!filterGame || ad.game === filterGame) &&
        (!filterRegion || ad.region.toLowerCase().includes(filterRegion.toLowerCase())) &&
        (!filterRank || ad.rank.toLowerCase().includes(filterRank.toLowerCase()))
      );
    })
.map((ad) => (
  <div key={ad.id} className="ad-item">
    <div>{ad.title}</div>
    <div>{ad.game}</div>
    <div>{ad.rank}</div>
    <div>{ad.region}</div>
    <div>      <a 
        href={`https://op.gg/${gameShortNames[ad.game]}/summoners/${ad.region}/${ad.creator}-${ad.game_tag}`} 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        {ad.creator}
      </a></div>
    <div>{ad.description}</div>
    <div className="ad-actions">
      {(loggedInUser === ad.creator || loggedInUser === 'admin') && (
        <div>
          <button
            className="menu-button"
            onClick={() => setShowMenu(showMenu === ad.id ? null : ad.id)}
          >
            <img src={ThreeDotsIcon}style={{ width: '20px', height: '20px' }}/>
          </button>
          {showMenu === ad.id && (
            <div className="popup-menu">
              <button onClick={() => handleDelete(ad.id)} style={{ color: 'rgb(211, 211, 211)' }}>
                Delete
              </button>
              <button
                onClick={() => {openEditPopup(ad) /*df----------------------------------------------------------------------------------------------*/
                }}
                style={{ color: 'rgb(211, 211, 211)' }}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
))
}
</div>
</div>
     {/* ZA EDITANJE OGLASOV */}
{showEditPopup && (
  <div className="popup-overlay" onClick={() => setShowEditPopup(false)}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <h2>Edit Ad</h2>
      <form onSubmit={handleEditSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Game:</label>
          <select value={editGame} onChange={(e) => setEditGame(e.target.value)} required>
            <option value="">-- Select Game --</option>
            {gameOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        {editGame && (
          <>
            <div>
              <label>Rank:</label>
              <select value={editRank} onChange={(e) => setEditRank(e.target.value)} required>
                <option value="">-- Select Rank --</option>
                {rankOptions[editGame].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Region:</label>
              <select value={editRegion} onChange={(e) => setEditRegion(e.target.value)} required>
                <option value="">-- Select Region --</option>
                {regionOptions[editGame].map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="popup-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => setShowEditPopup(false)}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
