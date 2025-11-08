import { Suspense } from 'react'
import './App.css'
import SubmissionForm from './components/SubmissionForm'
import SubmissionTable from './components/SubmissionTable'

function App() {

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const dataPromise = fetch(`${baseURL}/api/submissions`)
    .then(res => res.json());

  return (
    <div className="app-container">
      <div className='submission-from'>
        {/* input Field */}
        <h3 className="text-center fw-bold text-success px-4 m-4">SUBMISSION SYSTEM</h3>

        <Suspense fallback={<h2>Loading...</h2>}>
          <SubmissionForm />
        </Suspense>
      </div>
      <hr />
      <div className='submission-table'>
        {/* Output Field */}
        <Suspense fallback={<h2>Loading...</h2>}>
          <SubmissionTable dataPromise={dataPromise} />
        </Suspense>
      </div>
    </div>
  )
}

export default App
