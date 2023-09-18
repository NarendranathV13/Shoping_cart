import React from 'react';

const ProductModal = ({ selectedProduct, showModal }) => {
    return (
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedProduct && selectedProduct.product_name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {selectedProduct && (
                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-6 mt-2">
                                            <img src={selectedProduct.image_url} className="img-fluid mb-3 rounded-5 " alt="Product" />
                                        </div>
                                        <div className="col-lg-6 mt-5">
                                            <p><strong>Price: </strong> {selectedProduct.product_price_inr}</p>
                                            <p><strong>Description: </strong>{selectedProduct.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
