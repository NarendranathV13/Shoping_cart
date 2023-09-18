import React, { useState } from "react";
const ProductNav = ({ onSearch, onSort }) => {
    const [searchTerm, setSearchTerm] = useState("");
    //for filtering the product
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };
    const handleSort = (criteria) => {
        onSort(criteria);
    };
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded-5">
            <div class="container-fluid ">
                <form class="d-flex mx-2">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearch}//sending as props
                    />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <button
                                className="btn btn-link nav-link"
                                onClick={() => handleSort('price_asc')}
                            >
                             Price (Low to High)
                            </button>
                        </li>
                        <li class="nav-item">
                            <button
                                className="btn btn-link nav-link"
                                onClick={() => handleSort('price_desc')}
                            >
                                Price (High to Low)
                            </button>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default ProductNav;