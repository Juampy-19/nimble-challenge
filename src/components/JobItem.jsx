import { useState } from "react";
import { applyToJob } from "../services/api";

const JobItem  = ({ job, candidate }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setStatus(null);

            const body = {
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                repoUrl: repoUrl,
            };

            const res = await applyToJob(body);

            if (res.ok) {
                setStatus('Aplicación enviada correctamente.');
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jobItem">
            <h3>{job.title}</h3>

            <input
                type="text"
                placeholder="https://github.com/tu-usuario/tu-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
            />

            <button onClick={handleSubmit} disabled={loading || !repoUrl}>
                {loading ? 'Enviando...' : 'Submit'}
            </button>

            {status && <p>{status}</p>}
        </div>
    )
}

export default JobItem