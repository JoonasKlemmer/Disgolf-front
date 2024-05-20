"use client"
import { SetStateAction, useEffect, useState } from "react";
import DiscService from "@/services/DiscService";
import { useRouter } from "next/navigation";
import { IDisc } from "@/domain/IDisc";

export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [discs, setDiscs] = useState<IDisc[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
 
    useEffect(() => {
        const loadData = async () => {
            const response = await DiscService.getAllDiscs();
            if (response.data) {
                setDiscs(response.data);
            }
            setIsLoading(false);
        };
        loadData();
    }, []);

    const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchTerm(e.target.value);
    };

    const handleDiscClick = (disc: IDisc) => {
        router.push(`/routes/disc/${disc.id}`)
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search discs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="disc-grid">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    discs
                        .filter((disc) =>
                            disc.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((disc) => (
                            <div
                                key={disc.id}
                                className="disc-item"
                                onClick={() => handleDiscClick(disc)}
                            >
                                <h2>{disc.name}</h2>
                                <p>
                                {disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}
                                </p>
                                <p>{disc.manufacturerName}</p>
                                <p>{disc.categoryName}</p>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}
