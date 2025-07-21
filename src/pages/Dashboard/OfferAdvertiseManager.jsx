import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaBullhorn } from 'react-icons/fa';

const OfferAdvertiseManager = ({ sellerEmail }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offerPercentage, setOfferPercentage] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (sellerEmail) {
      axios
        .get(`/products/seller?sellerEmail=${sellerEmail}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [sellerEmail]);

  const offered = products.filter((p) => p.discount > 0);
  const normal = products.filter((p) => p.discount === 0);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    dialogRef.current.showModal();
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !offerPercentage) return;

    const data = {
      productId: selectedProduct._id,
      sellerEmail,
      percentage: parseInt(offerPercentage),
      image,
      description,
    };

    try {
      await axios.post('/admin/offer-requests', data);
      dialogRef.current.close();
      setOfferPercentage('');
      setDescription('');
      setImage('');
      alert('Offer request submitted');
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Offered Products</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Discount %</th>
            </tr>
          </thead>
          <tbody>
            {offered.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold">Normal Products</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {normal.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => handleOpenModal(p)}
                  >
                    <FaBullhorn className="mr-1" /> Add Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Add Advertisement for {selectedProduct?.name}
          </h3>
          <div className="space-y-2">
            <label className="label">Discount Percentage</label>
            <input
              type="number"
              placeholder="Enter percentage"
              className="input input-bordered w-full"
              value={offerPercentage}
              onChange={(e) => setOfferPercentage(e.target.value)}
            />

            <label className="label">Ad Image URL (optional)</label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <label className="label">Short Description</label>
            <textarea
              placeholder="Why should this be advertised?"
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="btn btn-outline"
              onClick={() => dialogRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OfferAdvertiseManager;
