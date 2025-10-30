import React, { useEffect, useState } from 'react';

const SubmissionTable = () => {
  // Define Component State----------------------
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Fetch data from Api and load on Component----------------------
  useEffect(() => {
    fetch('https://sabbirbd.xyz/app/public/api/submissions')
      .then(res => res.json())
      .then(response => {
        const data = response.data || response;
        // Sort ascending by Id----------------------
        const sortData = [...data].sort((a, b) => a.id - b.id);

        setSubmissions(sortData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);
  // Filter data based on Search Text----------------------
  const filteredData = submissions.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );
  // Pagination Logi ----------------------
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Api Response Handle----------------------
  if (loading) return <h4 className="text-center mt-5">Loading data...</h4>;
  if (!submissions.length) return <h4 className="text-center mt-5">No data found</h4>;

  return (
    <div className="card p-4  shadow-sm">
      <h3 className="mb-3 bg-secondary rounded text-white py-3 text-center">ALL INFORMATION</h3>
    {/* Search Box Design */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{sub.message}</td>
                <td>{new Date(sub.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default SubmissionTable;
