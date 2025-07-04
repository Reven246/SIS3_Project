import React, { useEffect, useState } from 'react';

function App() {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [region, setRegion] = useState('');
  const [creator, setCreator] = useState('guest');

//Filtri
const [filterGame, setFilterGame] = useState('');
const [filterRegion, setFilterRegion] = useState('');
const [filterRank, setFilterRank] = useState('');


  // Load ads on page load
  useEffect(() => {
    fetch('http://localhost:3001/oglasi')
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error('Error fetching ads:', error));
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/oglasi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, game, rank, region, creator }) 
    })
      .then((res) => res.json())
      .then((newAd) => {
        console.log('New ad response from backend:', newAd);
        setAds([...ads, { id: newAd.adId || Date.now(), title, description, game, rank, region, creator }]);
        setTitle('');
        setDescription('');
        setGame('');
        setRank('');
        setRegion('');
        setCreator('guest');
      })
      .catch((err) => console.error('Error posting ad:', err));
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
    <div style={{ padding: '2rem' }}>
      <h1>Oglasi (Ads)</h1>

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

<div>
  <h3>Filter Ads</h3>

  <label>Game:</label>
  <select value={filterGame} onChange={(e) => setFilterGame(e.target.value)}>
    <option value="">All</option>
    <option value="Valorant">Valorant</option>
    <option value="League of Legends">League of Legends</option>
    <option value="CS2">CS2</option>
    <option value="Overwatch">Overwatch</option>
  </select>

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


    <ul>
      {ads
      .filter((ad) => {
        return (
          (!filterGame || ad.game === filterGame) &&
          (!filterRegion || ad.region.toLowerCase().includes(filterRegion.toLowerCase())) &&
          (!filterRank || ad.rank.toLowerCase().includes(filterRank.toLowerCase()))
        );
      })
      .map((ad) => (

        <li key={ad.id}>
          <strong>{ad.title}</strong> ({ad.game}, {ad.rank}, {ad.region}) - by {ad.creator}: {ad.description}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
