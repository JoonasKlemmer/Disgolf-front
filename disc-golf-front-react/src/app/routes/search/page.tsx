"use client"
import { AppContext } from "@/state/AppContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { IDisc} from "@/domain/IDisc";
import DiscService from "@/services/DiscService";



export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [discs, setDiscs] = useState<IDisc[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDiscs, setSelectedDiscs] = useState<IDisc[]>([]);

    const loadData = async () => {
      const response = await DiscService.getAll()
      if (response.data) {
          setDiscs(response.data);
      }

      setIsLoading(false);
  };

  useEffect(() => { loadData() }, []);


  const filteredDiscs = discs.filter((disc) =>
    disc.discName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) return (<h1>Searching for discs</h1>);
  
  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

 
  const handleSelectForComparison = (disc:IDisc) => {
    if (selectedDiscs.length < 2 && !selectedDiscs.includes(disc)) {
      setSelectedDiscs([...selectedDiscs, disc]);
    } else if (selectedDiscs.length === 2) {
      console.log("Selected Discs for Comparison:");
      selectedDiscs.forEach((selectedDisc) => {
        console.log(selectedDisc.discName);
      });
      console.log("Only two discs can be selected for comparison.");
    } else {
      console.log("Only two discs can be selected for comparison.");
    }
  };
  const handleAddToWishlist = (disc: IDisc) => {
    // Placeholder for adding to wishlist logic
    console.log(`Added disc with ${disc.discName} to wishlist.`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search discs..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="disc-grid">
        {filteredDiscs.map((disc, index) => (
          <div key={index} className="disc-item">
            <h2>{disc.discName}</h2>
            <p>Speed: {disc.speed}</p>
            <p>Glide: {disc.glide}</p>
            <p>Turn: {disc.turn}</p>
            <p>Fade: {disc.fade}</p>
            <p>Manufacturer: {disc.manufacturerName}</p>
            <p>Category: {disc.categoryName}</p>
            <p>Price: ${disc.discPrice}</p>
            <a href={disc.pageUrl}>More Info</a>
            <button onClick={() => handleSelectForComparison(disc)}>
              Select for Comparison
            </button>
            <button onClick={() => handleAddToWishlist(disc)}>Add to Wishlist</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Selected Discs for Comparison:</h2>
        {selectedDiscs.map((disc, index) => (
          <div key={index}>
            <p>{disc.discName}</p>
            {/* Display other disc details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

