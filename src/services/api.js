const baseUrl = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
    const res = await fetch(`${baseUrl}/api/candidate/get-by-email?email=${email}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error fetching candidate');
    }

    return res.json();
}

export const getJobs = async () => {
    const res = await fetch(`${baseUrl}/api/jobs/get-list`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error fetching jobs');
    }

    return res.json();
}

export const applyToJob = async (data) => {
    const res = await fetch(`${baseUrl}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Error applying to job');
    }

    return result;
}