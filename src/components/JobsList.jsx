import JobItem from './JobItem';

const JobsList = ({ jobs, candidate }) => {
    return (
        <div className='jobsList'>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} candidate={candidate} />
            ))}
        </div>
    )
}

export default JobsList;