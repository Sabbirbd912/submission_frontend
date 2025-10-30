import { Suspense } from 'react'
import './App.css'
import SubmissionForm from './components/SubmissionForm'
import SubmissionTable from './components/SubmissionTable'

function App() {
  const dataPromise = fetch('http://localhost/https://sabbirbd.xyz/app/public/api/submissions')
    .then(res => res.json())

  return (
    <div className="app-container">
      <div className='submission-from'>

        <h3 className="text-center fw-bold text-success px-4 m-4">SUBMISSION SYSTEM</h3>

        <Suspense fallback={<h2>Loading...</h2>}>
          <SubmissionForm />
        </Suspense>
      </div>
      <hr />
      <div className='submission-table'>
        <Suspense fallback={<h2>Loading...</h2>}>
          <SubmissionTable dataPromise={dataPromise} />
        </Suspense>
      </div>
    </div>
  )
}

export default App
