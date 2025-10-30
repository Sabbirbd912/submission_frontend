import React, { useState } from 'react';

// Define state and store user input-------------------------
const SubmissionForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // On-change behabiour Handle input Change and Submit -------------------------

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const res = await fetch('https://sabbirbd.xyz/app/public/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });
            // Send post Request To Api -------------------------
            const result = await res.json();

            if (result.success) {
                setStatus('Successfully submitted!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to save. Try again.');
            }
            // if Api Data response Failed -------------------------
        } catch (error) {
            console.error(error);
            setStatus('Network or server error.');
        } finally {
            setLoading(false);
        }
    };

    // Input Form for collect Data-------------------------
    return (
        <div className="card p-4  shadow-sm">
            <h4 className="text-center bg-secondary rounded text-white py-2 mb-3">Give Your info </h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="message"
                    className="form-control mb-3"
                    placeholder="Message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {status && <p className="mt-3 text-center">{status}</p>}
        </div>
    );
};

export default SubmissionForm;
