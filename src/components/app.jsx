import { useEffect, useState } from 'react';
import './App.css';
import SubmissionForm from './components/SubmissionForm';
import SubmissionTable from './components/SubmissionTable';

function App() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [submissions, setSubmissions] = useState([]);

    // 🔹 API থেকে ডেটা আনবে
    const fetchSubmissions = async () => {
        const res = await fetch(`${baseURL}/api/submissions`);
        const data = await res.json();
        setSubmissions(data.data || data);
    };

    // 🔹 প্রথমে load হওয়ার সময় fetch করবে
    useEffect(() => {
        fetchSubmissions();
    }, []);

    // 🔹 ফর্ম সাবমিটের পর আবার data রিফ্রেশ করবে
    const handleFormSubmit = async (formData) => {
        const res = await fetch(`${baseURL}/api/submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(formData),
        });
        const result = await res.json();

        if (result.success) {
            await fetchSubmissions(); // ✅ ডেটা সাথে সাথে রিফ্রেশ
        }
    };

    return (
        <div className="app-container">
            <div className="submission-form">
                <h3 className="text-center fw-bold text-success px-4 m-4">SUBMISSION SYSTEM</h3>
                <SubmissionForm onSubmit={handleFormSubmit} />
            </div>
            <hr />
            <div className="submission-table">
                <SubmissionTable submissions={submissions} />
            </div>
        </div>
    );
}

export default App;
