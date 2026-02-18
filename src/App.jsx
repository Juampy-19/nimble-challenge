import { useEffect, useState } from "react";
import { getCandidateByEmail, getJobs } from "./services/api";
import JobsList from "./components/JobsList";
import './css/styles.css';
import Loading from "./components/Loading";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = 'jpcastellano1990@gmail.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateData = await getCandidateByEmail(email);
        const jobsData = await getJobs();

        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) return <p>Cargando...</p>;
  if (loading) return <Loading />
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="contPositions">
      <h1>Open positions</h1>
      <JobsList jobs={jobs} candidate={candidate} />
    </div>
  )
}

export default App;