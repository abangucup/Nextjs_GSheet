"use client";

import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

export default function Home() {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman

    try {
      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: nama, alamat: alamat }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccess(result.message);
        setError('');
      } else {
        setError(result.message);
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan pada server.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={onSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3">
          <label htmlFor="inputNama" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNama"
            placeholder="Nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputAlamat" className="form-label">
            Alamat
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAlamat"
            placeholder="Alamat lengkap"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>
        <button type="submit" onClick={onSubmit} className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}
