"use client"
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import DiscService from "@/services/DiscService";
import { useRouter } from "next/navigation";
import { IDisc } from "@/domain/IDisc";

export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [discs, setDiscs] = useState<IDisc[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [discsPerPage, setDiscsPerPage] = useState(6);
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

    const nextPage = () => {
        if (currentPage < Math.ceil(discs.length / discsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleDiscClick = (disc: IDisc) => {
        router.push(`/routes/disc/${disc.id}`)
    };

    const handleDiscsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDiscsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const indexOfLastDisc = currentPage * discsPerPage;
    const indexOfFirstDisc = indexOfLastDisc - discsPerPage;
    const currentDiscs = discs
        .filter((disc) =>
            disc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstDisc, indexOfLastDisc);

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search discs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="disc-grid-container">
                <div className="disc-grid">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        currentDiscs.map((disc) => (
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
            <div className="pagination">
                <select value={discsPerPage} onChange={handleDiscsPerPageChange}>
                    {Array.from({ length: discs.length }, (_, i) => i + 1).map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </>
    );
}
